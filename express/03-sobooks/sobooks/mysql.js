let mysql = require('mysql');
// 配置
let options = {
    host: 'localhost',
    port: '3370', // 可选，默认是3306
    user: 'root',
    password: '1823799296',
    database: 'book'
}

// 创建与数据库的连接对象
let ret = mysql.createConnection(options);

// 建立连接
ret.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('数据库链接成功');
    }
})

function sqlQuery(strSql, arr) {
    return new Promise(function (resolve, reject) {
        ret.query(strSql, arr, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// 获取所有分类
async function getCataory() {
  let sqlStr = 'select * from classify'
  let result = await sqlQuery(sqlStr);
  return Array.from(result);
}

module.exports = {sqlQuery,getCataory};