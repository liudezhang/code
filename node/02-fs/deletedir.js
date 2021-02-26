/* 
    删除目录
*/

let fs = require('fs');

fs.rmdir('./测试', function (err) {
    err ? console.log('删除失败') : console.log('删除成功')
});