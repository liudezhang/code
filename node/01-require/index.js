let one = require('./index1');
/* 
    1、在没有获取任何内容导出去的情况下获取某个文件的内容，就会得到一个空对象
    2、require获取文件路径的时候，可以不加后缀名，默认后缀名就是.js
*/
// 仅在模块第一次被使用时执行一次
let a = require('./index1');

console.log(one.a);
console.log(one.c);
console.log(one.str);

console.log(one == a); // true
console.log(one);

let $ = require('jquery');
console.log($);