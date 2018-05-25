/**
 * index.js
 * @authors Dujing (1198994896@qq.com)
 * @date    2018-05-16 15:52:00
 * @version $Id$
 */

import './css/style.css';

function component() {
    var ele = document.getElementById('home');
    ele.innerHTML = 'HOME';
    return ele;
}

document.body.appendChild(component());