/*
 * @Author: your name
 * @Date: 2020-12-16 19:06:44
 * @LastEditTime: 2020-12-20 15:57:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \node\04-文件流\write.js
 */
let fs = require('fs');

// 1、创建写入流
/* 
    语法：fs.createWriteStream(文件路径，[可选的配置操作])
*/

let ws = fs.createWriteStream('hello.txt', {
    flags: 'a',
    encoding: 'utf-8'
}, function () {})
// console.log(ws);

// 监听文件打开事件
ws.on('open', function () {
    console.log(1, '文件打开')
})

// 监听文件准备事件
ws.on('ready', function () {
    console.log(2, '文件准备写入')
})

// 监听文件关闭事件
ws.on('close', function () {
    console.log(5, '写入完成,文件关闭');
})

let content = `刘德樟\n毕家豪\n刘煌\n刘志强\n刘晨曦\n刘明\n`;

// 文件流式写入
ws.write(content, function (err) {
    err ? console.log(err) : console.log(3, '内容流入完成')
})

// 文件写入完成
ws.end(function () {
    console.log(4, '文件写入关闭')
});