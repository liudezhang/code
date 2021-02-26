let fs = require('fs');
// 删除
fs.unlink(('./cf.css'), function () {
    console.log('删除成功')
});