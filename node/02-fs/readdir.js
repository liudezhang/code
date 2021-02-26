/* 
    目录的读取
*/

let fs = require('fs');
const {
    fsRead,
    fsWrite
} = require('./fs');


const path = 'all.txt'
fs.readdir('../02-fs/', function (err, files) {
    if (err) {
        console.log(err)
    } else {
        console.log(files)
        files.forEach(async (filesName, index) => {
            // 读取每个文件的内容
            let content = await fsRead('./' + filesName)
            // 把每个文件的内容写入到指定文件中
            await fsWrite(path, content, flag = 'a+')
            // 输出文件名
            console.log(filesName);
        })
    }
})