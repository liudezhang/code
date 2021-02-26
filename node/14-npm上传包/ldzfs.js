let fs = require('fs');

// 读文件封装
/* 
    path：文件地址
    flag：文件操作方式
    encoding：文件字符编码
*/
function read(path, flag = 'r', encoding = 'utf8') {
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
function write(path, content, flag = 'a', encoding = 'utf8') {
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

// 创建目录函数
function mkdir(path) {
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


function readdir(path, options) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, options, function (err, files) {
            if (err) {
                reject(err)
            } else {
                resolve(files)
            }
        })
    })
}


// 重命名函数
function rename(oldPath, newPath) {
    return new Promise(function (resolve, reject) {
        fs.rename(oldPath, newPath, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve('修改成功');
            }
        })
    })
}

// 暴露接口（导出）解构的方法
module.exports = {
    read,
    write,
    mkdir,
    rename,
    readdir
};