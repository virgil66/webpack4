/**
 * 
 * @authors Dujing (1198994896@qq.com)
 * @date    2018-05-16 17:12:19
 * @version $Id$
 */

function about() {
	let ele = document.getElementById('about');
	ele.innerHTML = 'ABOUT';
	return ele;
}

document.body.appendChild(about());