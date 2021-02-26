/*
 * @Author: your name
 * @Date: 2020-12-15 19:53:32
 * @LastEditTime: 2020-12-20 14:12:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\09-axios\fs.js
 */
let fs = require('fs');
const {
    resolve
} = require('path');

// 读文件封装
/* 
    path：文件地址
    flag：文件操作方式
    encoding：文件字符编码
*/
function fsRead(path, flag = 'r', encoding = 'utf8') {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, {
            flag: flag,
            encoding: encoding
        }, function (err, data) {
            err ? reject(err) : resolve(data);
        })
    })
}
// 写文件封装
/* 
    path:文件地址
    content：要写入的内容
*/
function fsWrite(path, content, flag = 'a', encoding = 'utf8') {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, {
            flag: flag,
            encoding: encoding
        }, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })
    })
}

function fsDir(path) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(path, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve('成功创建目录')
            }
        })
    })
}

// 暴露接口（导出）解构的方法
module.exports = {
    fsRead,
    fsWrite,
    fsDir
};