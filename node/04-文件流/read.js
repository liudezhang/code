let fs = require('fs');

/* 
    创建读取流，语法：fs.createReadStream(文件路径，【可选配置项】)
*/
// let rd = fs.createReadStream('./hello.txt', {
//     flags: 'r',
//     encoding: 'utf8'
// }, function () {})

let rd = fs.createReadStream('../1.01-数据库初体验(Av39807944,P1).mp4', {
    flags: 'r'
})

let wt = fs.createWriteStream('./noe.mp4', {
    flags: 'a'
})

// console.log(rd);

rd.on('open', function () {
    console.log('打开读取的文件')
})

rd.on('close', function () {
    wt.end();
    console.log('读取流结束');
})

// 每一批数据流入完成
rd.on('data', function (res) {
    console.log('单批数据流入' + res.length);
    console.log(res);
    wt.write(res, () => {
        console.log('单批输入流入完成');
    })
})