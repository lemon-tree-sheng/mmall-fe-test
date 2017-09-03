/*
* @Author: shengxingyue
* @Date:   2017-09-02 18:34:21
* @Last Modified by:   shengxingyue
* @Last Modified time: 2017-09-03 14:33:57
*/
/*
* 使用 webpack 自带的 js 加载器来加载 js 脚本
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'; // 读取启动时设进 node 环境的 WEBPACK_ENV 变量
// 获取 html 模板参数
var getHtmlConfig = function (name) {
     return {
          template : './src/view/' + name + '.html',
          filename : 'view/' + name + '.html',
          inject : true,
          hash : true,
          chunks : ['common', name]
     }
};

var config = {
     // 这里可配置多个入口文件
     entry: {
     	'common': ['./src/page/common/index.js'],
     	'index' : './src/page/index/index.js',
     	'login' : './src/page/login/index.js',
     },
     output: {
         path: './dist', // 打包生成代码的位置
         publicPath: '/dist', // 用于浏览器访问时候的根目录
         filename: 'js/[name].js' // 将每个入口模块单独打包成一个文件，并放在 js 文件夹下面
     },
     // 外部文件的引入
     externals : {
     	'jquery' : 'window.jQuery'
     },
     module : {
     	loaders : [
               // 处理 css
               {test : /\.css$/, loader : ExtractTextPlugin.extract('style-loader','css-loader')},
     		// 处理图片和字体
               {test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader : 'url-loader?limit=100&name=resource/[name].[ext]'}
     	]
     },
     resolve : {
          alias : {
               page : __dirname + '/src/page',
               view : __dirname + '/src/view',
               util : __dirname + '/src/util',
               service : __dirname + '/src/service',
               image : __dirname + '/src/image'
          }
     },
     plugins : [
     	// 将公共模块文件如 ./src/page/common/index.js 单独打包，同时将其余入口模块的公共引用也一起打包，使用时页面中需要先
     	// 将打包出来的公共模块引入
     	new webpack.optimize.CommonsChunkPlugin({ // 
     		name : 'common', // 入口文件中的 key
     		filename : 'js/common.js' // 打包出来的文件名称
     	}),
     	// 这个插件把入口文件引入的 css 单独打包进 css 文件中，[name]指的是 entry 中的 key
     	new ExtractTextPlugin("css/[name].css"),
          // 处理 html 模板
          new HtmlWebpackPlugin(getHtmlConfig('index')),
          new HtmlWebpackPlugin(getHtmlConfig('login'))
     ]
};

// 如果是开发环境，那么把 webpack-dev-server 打包进 common 模块
if (WEBPACK_ENV == 'dev') {
     config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;