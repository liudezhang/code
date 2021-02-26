let mysql = require('mysql');
// 配置
let options = {
    host: 'localhost',
    // port: '3306',    // 可选，默认是3306
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

// 执行数据库语句
// 执行查询语句
let strSql = "show tables";

ret.query(strSql, (err, res, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
        console.log(fields);
    }
})

strSql = 'create database bjh';
ret.query(strSql, (err, res, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log('数据库创建成功');
    }
})

strSql = 'use bjh';
ret.query(strSql, (err, res, fields) => {
    err ? console.log(err) : console.log('选择数据库');
})

strSql = `
    create table user(
        id int primary key auto_increment,
        username varchar(20) not null ,
        password varchar(50) not null ,
        emil varchar(50) not null 
    );
`;
ret.query(strSql, (err, res) => {
    err ? console.log(err) : console.log('数据表创建成功');
})

strSql = `insert into user (username,password,emil) values ('刘德樟','1823799296','17379743709@139.com')`;
ret.query(strSql, (err, res) => {
    err ? console.log(err) : console.log('数据插入成功');
})

// ? 代表占位符，query方法的第二个参数可以是数组，依次存放
strSql = `insert into user (username,password,emil) values (?,?,?)`;
ret.query(strSql, ['李寒惠', 'I love you', '123456789'], (err, res) => {
    err ? console.log(err) : console.log('数据插入成功');
})

strSql = 'select * from user';
ret.query(strSql, (err, res) => {
    err ? console.log(err) : console.log(res);
})