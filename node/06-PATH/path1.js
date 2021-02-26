/*
 * @Author: your name
 * @Date: 2020-12-19 14:07:03
 * @LastEditTime: 2021-01-08 21:32:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\06-PATH\path1.js
 */
let fs = require('fs')
let path = require('path');

// console.log(path);

let strPath = "http://nodejs.cn/api/path.html";
// 获取路径信息的扩展名
/* 
    path.extname() 方法会返回 path 的扩展名，即 path 的最后一部分中从最后一次出现 .（句点）字符直到字符串结束。 如果在 path 的最后一部分中没有 .，或者如果 path 的基本名称（参见 path.basename()）除了第一个字符以外没有 .，则返回空字符串。
*/
let info = path.extname(strPath);
console.log(info); // .html
/* 
    path.basename() 方法会返回 path 的最后一部分
*/
let info2 = path.basename(strPath, '.html')
console.log(info2); // path


// 路径组合
/* 
    path.resolve() 方法会将路径或路径片段的序列解析为绝对路径
    如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。
*/
let arr = ['/sxt', 'qianduan', 'zhongji', 'ldz', '.html'];
// 解构
let info1 = path.resolve(...arr);
let info3 = path.resolve();
console.log(info1); // G:\sxt\qianduan\zhongji
console.log(info3); // G:\vscode\node\06-node中的核心模块

/* 
    path.join() 方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。
    如果任何的路径片段不是字符串，则抛出 TypeError。
*/
let info5 = path.join('../04-文件流', '..', 'ldz', 'zj');
console.log(info5); // ..\ldz\z


// 获取当前执行目录的完整路径
console.log(__dirname); // G:\vscode\node\06-node中的核心模块
let info4 = path.join(__dirname, 'sxt', 'qianduan', 'zhonji'); //G:\vscode\node\06-node中的核心模块\sxt\qianduan\zhonji
console.log(info4);


// 小案例
/* 
    解析str字符串，得到路径
    读取 guonei.html 的内容
*/
let str = 'http://www.ldz.com/xinweng/guonei.html'
// 解析出当前目录
// 以 '/' 分割当前字符串
let arrPath = str.split('/')
console.log(arrPath);
// [ 'http:', '', 'www.ldz.com', 'xinweng', 'guonei.html' ] 
// slice() 截取字符串
let strArr = arrPath.slice(arrPath.length - 2, arrPath.length);
console.log(strArr);
// 拼接路径
let arrStr = path.join(__dirname, ...strArr);
console.log(arrStr);
// 读取内容
fs.readFile(arrStr, {
    flag: 'r',
    encoding: 'utf-8'
}, function (err, data) {
    err ? console.log(err) : console.log(data);
})