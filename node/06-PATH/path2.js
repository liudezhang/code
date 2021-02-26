let path = require('path');

// 获取当前执行文件的目录
console.log(__dirname);

// 获取当前的执行文件
console.log(__filename);

// 获取当前执行文件的文件名
console.log(path.basename(__filename, '.js'));

// 获取当前执行文件的扩展名
console.log(path.extname(__filename));

/* 
    G:\vscode\node\06-node中的核心模块
    G:\vscode\node\06-node中的核心模块\path2.js
    path2
    .js
*/