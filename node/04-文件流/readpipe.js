/* 
    管道
*/
let fs = require('fs');
/* 
    创建读取流，语法：fs.createReadStream(文件路径，【可选配置项】)
*/
let rd = fs.createReadStream('../1.01-数据库初体验(Av39807944,P1).mp4', {
    flags: 'r'
})

let wt = fs.createWriteStream('./two.mp4', {
    flags: 'a'
})

rd.on('open', function () {
    console.log('打开读取的文件')
})

rd.on('close', function () {
    console.log('读取流结束');
})

// 管道
rd.pipe(wt);