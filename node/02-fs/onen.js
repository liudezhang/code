/* 
    文件打开
*/

// 导入文件模块
let fs = require('fs');

/* 
    node 读写文件也有同步和异步的接口
*/

// 同步方式
/* 
    fs.openSync(path[, flags, mode])
*/
// 打开文件
let open = fs.openSync('./hello1.txt', 'r')
// console.log(open)
// 读取文件
let buf = Buffer.alloc(20)
let read = fs.readFileSync(open, {
    flag: 'r',
    encoding: 'utf-8'
});
// console.log(read);