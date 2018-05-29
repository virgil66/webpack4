# webpack4
1、 Webpack 的含义介绍

    在 webpack 的官方文档上，是对 webpack 这样介绍的。webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundle)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

    本文中，会出现构建这个词。构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代去实现，让代码自动化地执行这一系列复杂的流程。构建就是把源代码转换成发布到线上的可执行 JavaScript、CSS、HTML 代码，包括如下内容：
    1、代码转换：TypeScrip 编译成 JavaScript、SCSS 编译成 CSS 等；
    2、文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等；
    3、代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载；
    4、模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件；
    5、自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器；
    6、代码校验：在代码被提交到仓库前需要校验代码是否符合代码规范，以及单元测试是否通过；
    7、自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统；

2、 初始化项目

    2.1 初始化 package.json

        npm init -y

        // package.json
        "scripts": {
            "build": "webpack  --profile --progress --colors --display-error-details",
            "dev": "webpack  --display-modules --profile --progress --colors --display-error-details"
          }

    2.2 参数说明

       1. color 输出结果带色彩
       2. profile 输出性能数据，可以看到每一步的耗时
       3. progress 输出当前编译的进度，以百分比的形式呈现
       4. display-modules 默认情况下 node_modules 下模块会被隐藏，加上这个参数可以显示这个被隐藏的模块
       5. display-error-details 输出详细的错误信息

    2.3 全局安装

        npm install webpack -g

    2.4 本地安装(一般推荐本地安装)

        npm install webpack webpack-cli --save-dev // --save-dev 是指开发环境需要，线上环境不需要

3、 webpack 的配置

    3.1 webpack 的核心概念
        1. Entry: 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入；
        2. Output: 输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果；
        3. Module: 模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。 Webpack 会从配置的 Entry 开始递归找出所有依赖的模块；
        4. Chunk: 代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
        5. Loader: 模块转化器，用于把模块原内容按照需求转换成新内容；
        6. Plugin: 扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做开发者想要做的事情；

    3.2 配置 Webpack

        npm install webpack webpack-cli --save-dev

        在项目根目录下创建 src 和 dist 文件夹，然后在新建 index.html 和 webpack.config.js 文件。

        // webpack.config.js
        const path = require('path');
        const config = {
            entry: './src/index.js', // 程序入口点
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist'),
                publicPath: "/" // 公共资源路径
            },
            module: {
                rules: []
            },
            resolve: {}, // 配置解析
            plugins: [],
            devServer: {
                contentBase: path.join(__dirname, 'dist'),
                port: 8080,
                compress: true, // 一切服务器都采用 gzip 压缩
                open: true, // 自动打开浏览器
            },
            mode: 'development', // 开发模式
        };
        module.exports = config;

4、 配置开发服务器

    npm install webpack-dev-server --save-dev

    // webpack.config.js
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        compress: true, // 一切服务器都采用 gzip 压缩
        open: true, // 自动打开浏览器
        hot: true, // 热更新
        color: true, // 色彩显示
        historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        inline: true, //应用程序启用内联模式(inline mode)
        progress: true, // 将运行进度输出到控制台
    }

    // package.json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --profile --progress --colors --display-error-details",
        "dev": "webpack-dev-server --display-modules --profile --progress --colors --display-error-details"
    }

5、 入口文件和输出文件类型
    简单规则：每个 HTML 页面都有一个入口起点。单页面应用(SPA)：一个入口起点；多页面应用(MPA)：多个入口起点。

    5.1 一个入口起点和一个输出文件

        // webpack.config.js
        entry: './src/index.js', // 程序入口点
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: "/" // 公共资源路径
        }

    5.2 多个入口起点(数组形式)和一个输出文件

        // webpack.config.js
        entry: ['./src/index.js', './src/about.js'], // 程序入口点
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: "/" // 公共资源路径
        }

    5.3 多个入口起点和多个输出文件

        // webpack.config.js
        entry: {
            home: "./src/index.js",
            about: "./src/about.js"
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: "/" // 公共资源路径
        },
        plugins: [
            new HtmlWepackPlugin(
                {
                    minify: {
                        removeAttributeQuotes:true
                    },
                    hash: true,
                    template: './dist/index.html',
                    chunks: ['index'],
                    filename: 'index.html'
                },
                {
                    minify: {
                        removeAttributeQuotes:true
                    },
                    hash: true,
                    template: './dist/about.html',
                    chunks: ['about'],
                    filename: 'about.html'
                }
            )
        ]

        分别在 src 文件夹下新建 about.js 文件和在 dist 文件夹下新建 about.html 文件

        // index.html
        <nav id="nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </nav>
        <div id="home"></div>
        <script src="home.bundle.js"></script>

        // about.html
        <div id="about"></div>
        <script src="about.bundle.js"></script>

        //index.js
        function component() {
            var ele = document.getElementById('home');
            ele.innerHTML = 'HOME';
            return ele;
        }
        document.body.appendChild(component());

        // about.js
        function component() {
            var ele = document.getElementById('about');
            ele.innerHTML = 'ABOUT';
            return ele;
        }
        document.body.appendChild(component());

6、 Loaders
    webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。通过使用不同的 Loader ，Webpack 可以把不同的文件都转换成 JS 文件 。

    test: 匹配处理文件的扩展名的正则表达式
    use: loader 名称，即模块的名称
    include/exclude: 手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
    query: 为 loaders 提供额外的设置选项 

    6.1 babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5

        npm install babel-loader babel-core babel-preset-env --save-dev

        // webpack.config.js
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
                }
            ]
        }

    6.2 css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
        style-loader 将模块的导出作为样式添加到 DOM 中

        npm install css-loader style-loader --save-dev

        // webpack.config.js
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'], // 从右向左写，webpack 的特性，因此 style-loader 必须在 css-loader 的前面
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                }
            ]
        }

        // index.js
        import './style.css';
        function component() {
            var ele = document.getElementById('home');
            ele.classList.add('home');
            ele.innerHTML = 'HOME';
            return ele;
        }
        document.body.appendChild(component());

        // style.css
        .home {
            border: solid 1px red;
        }

    6.3 file-loader 解决 CSS 等文件中的引入图片路径问题
        url-loader 当图片较小的时候会把图片转为 base64 编码，大于 limit 参数的时候还是使用 file-loader 进行拷贝(这里只以 url-loader 为例, file-loader 与 url-loader 类似)

        npm install file-loader --save-dev
        npm install url-loader --save-dev

        // webpack.config.js
        module: {
            rules: [
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
                }
            ]
        }

        // style.css
        html,body {
            width: 100%;
            height: 100%;
            background: url("images/bg.jpg");
            background-size: 100% 100%; 
        }

        // 原图片目录
        + src
        +   images
        +       bg.png

        // 处理后的图片目录
        + dist
        +   src
        +       images
        +           bg.png

    6.4 file-loader 加载字体

        // webpack.config.js
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: ''
                    },
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                }
            ]
        }

        // style.css
        @font-size {
            font-family: 'MyFont';
            src: url('fonts/glyphicons-halflings-regular.woff') format('woff'),
                 url('fonts/glyphicons-halflings-regular.woff2') format('woff2');
            font-weight: 600;
            font-style: normal;
        }
        html,body {
            font-family: 'MyFont';
        }

        // 原字体目录
        + src
        +   fonts
        +       glyphicons-halflings-regular.woff
        +       glyphicons-halflings-regular.woff2

        // 处理后的字体目录
        + dist
        +   src
        +       fonts
        +           glyphicons-halflings-regular.woff
        +           glyphicons-halflings-regular.woff2  
        
    6.5 less-loader 
    
        npm install less less-loader --save-dev
        
        // webpack.config.js
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1
                                }
                            },
                            'less-loader',
                            'postcss-loader'
                        ],
                        publicPath: ''
                    }), // 从右向左写，webpack 的特性，因此 style-loader 必须在 css-loader 的前面
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                }
            ]
        }
        
        // index.js
        import './src/less/style.less';
        
        // 原 less 文件目录
        +   src
        +       less
        +           style.less
        
        // 输出文件目录
        +   dist
        +       home.css

7、Plugins

    7.1 使用 html-webpack-plugin 创建 html 模板

        npm install html-webpack-plugin --save-dev

        // webpack.config.js
        const HtmlWepackPlugin = require('html-webpack-plugin');
        let HtmlWepackPlugin = require('html-webpack-plugin');
        plugins: [
            new HtmlWepackPlugin(
                {
                    minify: {
                        removeAttributeQuotes: false
                    },
                    hash: true,
                    chunks: ['home'],
                    template: './dist/index.html',
                    filename: 'index.html'
                }
            ),
            new HtmlWepackPlugin(
                {
                    minify: {
                        removeAttributeQuotes:true
                    },
                    hash: true,
                    chunks: ['about'],
                    template: './dist/about.html',
                    filename: 'about.html'
                }
            )
        ]

        7.1.1 filename: String 要写入的 HTML 文件。默认为 index.html
        7.1.2 template: String 模板路径
        7.1.3 favicon: String 将给定的图标路径添加到输出 HTML
        7.1.4 minify: Object 对 HTML 文件进行压缩。removeAttrubuteQuotes 是去掉属性的双引号
        7.1.5 hash: Boolean 引入产出资源的时候加上哈希避免缓存
        7.1.6 cache: Boolean 仅在文件被更改时才发出文件

    7.2 打包前清空输出文件夹

        npm install clean-webpack-plugin --save-dev

        // webpack.config.js
        const cleanWebpackPlugin = require('clean-webpack-plugin');
        plugins: [
            new cleanWebpackPlugin(path.join(__dirname, 'dist'))
        ]

    7.3 分离 CSS

        npm install extract-text-extract-plugin --save-dev

        // webpack.config.js
        const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                        publicPath: ''
                    }), // 从右向左写，webpack 的特性，因此 style-loader 必须在 css-loader 的前面
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                }
        },
        plugins: [
            new ExtractTextWebpackPlugin('[name].css'), // [name] 表示原名输出
        ]

        // 原样式文件目录
        + src
        +   css
        +       style.css

        // 处理后样式文件目录
        + dist
        +   home.css

    7.4 处理 CSS3 属性前缀

    为了浏览器的兼容性，有时候需要加入 -webkit, -ms, -o, -moz 等这些前缀
    1、Trodent 内核：主要代表为 IE 浏览器，前缀为 -ms
    2、Gecko 内核：主要代表为 Firefox, 前缀为 -moz
    3、Presto 内核：主要代表为 Opera, 前缀为 -o
    4、Webkit 内核：主要代表为 Chrome 和 Safari, 前缀为 -webkit

        npm install postcss-loader autoprefixer --save-dev

        在项目根目录下新建 postcss.config.js 文件

        // postcss.config.js
        module.exports = {
            plugins: [
                require('autoprefixer')
            ]
        }

        // webpack.config.js
        module: {
            rules: [
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
                }
            ]
        }

    7.5 拷贝静态文件

    有时项目中没有引用得文件也需要打包到目标目录下

    // webpack.config.js
    const copyWebpackPlugin = require('copy-webpack-plugin');
    plugins: [
        new copyWebpackPlugin([{
            from: path.join(__dirname, 'src'), // 需要打包得目录
            to: path.join(__dirname, 'dist/assets') // 打包之后存储得目录
        }]),
    ]

8、resolve 解析

    8.1 extensions 

        指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配

        // webpack.config.js

9、使用环境变量
