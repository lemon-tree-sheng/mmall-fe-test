/*
* @Author: shengxingyue
* @Date:   2017-09-02 19:06:01
* @Last Modified by:   shengxingyue
* @Last Modified time: 2017-09-03 15:44:06
*/
`use strict`;
require('./index.css');
var _mm = require('util/mm.js');

$('body').html('hello 123');

var html = '<div>{{data}}<div>';
var dt = {
	data : 123
};
console.log(_mm.renderHtml(html, dt));