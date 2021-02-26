/*
 * @Author: your name
 * @Date: 2020-12-15 20:51:52
 * @LastEditTime: 2021-01-04 21:49:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\02-fs\write.js
 */
/* 
    文件的写入
*/

let fs = require('fs');
// 异步写入
fs.writeFile('./test.txt', '你叫什么?\n', {
    flag: 'a',
    encoding: 'utf8'
}, function (err) {
    if (err) {
        console.log('写入出错')
    } else {
        console.log('写入成功')
    }
})

// 封装
/* 
    path:文件地址
    content：要写入的内容
*/
function fsWrite(path, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, {
            flag: 'a',
            encoding: 'utf8'
        }, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })
    })
}

async function writeList() {
    await fsWrite('cf.txt', '今晚吃炒饭\n');
    await fsWrite('cf.txt', '今晚和奶茶\n');
    await fsWrite('cf.txt', '今晚不洗澡\n');
    // await fsWrite('cf.py', '今晚吃炒饭\n');
    // await fsWrite('cf.css', '今晚和奶茶\n');
    // await fsWrite('cf.less', '今晚不洗澡\n');
}

writeList();