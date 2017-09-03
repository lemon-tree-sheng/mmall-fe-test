/*
* @Author: shengxingyue
* @Date:   2017-09-03 12:52:42
* @Last Modified by:   shengxingyue
* @Last Modified time: 2017-09-03 15:42:04
*/
`use strict`;
var hogan = require('hogan');
var mm = {
	// 网络请求
	request : function (param) {
		$.ajax({
			url     : param.url    || '',
			type    : param.method || 'GET',
			dataTpe : param.type   || 'json',
			data    : param.data   || '',
			success : function(res) {
				console.log('接口请求成功');
				// 逻辑判断返回数据，返回的状态码可用于业务判断
				if (res.status == 0 && typeof param.success == "function") {
					param.success(res); // 执行一个业务回调
				}
			},
			error :function(errMsg) {
				console.log(errMsg);
			}
		});
	},
	// html 渲染
	renderHtml : function(htmlTemplate, data) {
		var template = hogan.compile(htmlTemplate),
			result = template.render(data);
		return result;
	}
};

module.exports = mm;