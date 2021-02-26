/*
 * @Author: your name
 * @Date: 2020-12-19 15:32:03
 * @LastEditTime: 2021-01-08 21:31:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\08-URL\url.js
 */

let url = require('url');
console.log(url);

let httpUrl = 'https://sale.vmall.com/huaweizone.html?cid=10618'
let urlObj = url.parse(httpUrl);
console.log(urlObj);

// let targetUrl = 'https://www.mi.com/?client_id=180100041080&masid=2110.0001';
// httpUrl = '../ldz/web/zhonji/url.html';

// /* 
//     url.resolve()
//     拼接路径
// */
// let newUrl = url.resolve(targetUrl, httpUrl);
// console.log(newUrl); // https://www.mi.com/ldz/web/zhonji/url.html