/**
 * webpack.config.js
 * @authors Dujing (1198994896@qq.com)
 * @date    2018-05-16 14:45:10
 * @version $Id$
 */

const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: {
		home: './src/index.js',
		about: './src/about.js'
	}, // 程序入口点
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/" // 公共资源路径
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["env"]
					}
				},
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						'postcss-loader'
					],
					publicPath: ''
				}), // 从右向左写，webpack 的特性，因此 style-loader 必须在 css-loader 的前面
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1024, // 限制图片的大小
						name: '[path][name].[ext]', // 输出的文件名规则
						outputPath: '' // 表示输出文件路径前缀
					}
				},
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						outputPath: ''
					}
				},
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [' ', '.js', '.css', '.json']
	}, // 配置解析
	plugins: [
		new HtmlWepackPlugin(
			{
				minify: {
					removeAttributeQuotes: false
				},
				hash: true,
				chunks: ['home'],
				template: './src/index.html',
				filename: 'index.html'
			}
		),
		new HtmlWepackPlugin(
			{
				minify: {
					removeAttributeQuotes: false
				},
				hash: true,
				chunks: ['about'],
				template: './src/about.html',
				filename: 'about.html'
			}
		),
		new ExtractTextWebpackPlugin('[name].css'), // [name] 表示原名输出
		new copyWebpackPlugin([{
			from: path.join(__dirname, 'src'),
			to: path.join(__dirname, 'dist/assets')
		}]),
    	new cleanWebpackPlugin(path.join(__dirname, 'dist'))
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 8080,
		compress: true, // 一切服务器都采用 gzip 压缩
		open: true, // 自动打开浏览器
	},
	mode: 'development', // 开发模式
}

module.exports = config;