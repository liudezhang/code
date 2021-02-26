/* 
    文件读取
*/

// 异步读取文件
/* 
    第一个参数：文件的地址
    第二个参数：可选对象
        参数一：文件的打开方式
        参数二：文件的字符编码
    第三个参数：回调函数
*/
fs.readFile('./hello1.txt', {
    flag: 'r',
    encoding: 'utf8'
}, function (err, data) {
    // err ? console.log(err) : console.log(data);
});

// console.log(1);
fs.readFile('./h.html', {
    encoding: 'utf8'
}, function (err, data) {
    // err ? console.log(err) : console.log(data);
    // console.log(3);
});
// console.log(2)


// 异步读取封装
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

let w = fsRead('./hello3.txt', 'r');
w.then(function (res) {
    // console.log(res);
})

async function ReadList() {
    let f1 = await fsRead('./hello1.txt');
    let f2 = await fsRead(f1 + '.txt');
    let f3 = await fsRead(f2 + '.txt');
    console.log(f1, f1.length);
    console.log(f2, f2.length);
    console.log(f3, f3.length);
}

ReadList();