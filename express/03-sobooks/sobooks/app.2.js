let sqlQuery = require('./mysql');
let express = require('express');
// 实例对象
let app = express();
// 使用ejs模板来渲染页面
let ejs = require('ejs');
// 将模板引擎与express应用相关联
app.set('views', 'views'); // 设置视图的对应目录
app.set('view engine', 'ejs'); // 设置默认的模板引擎
app.set('ejs', ejs.__express); // 定义模板引擎



app.get('/', async (req, res) => {
  // 查询book里的前28条数据
  let strSql = 'select id,name,author,isbn,bookimg,cataory from book limit 0,28';
  let result = await sqlQuery(strSql);
  // console.log(result);
  let resJson = JSON.stringify(Array.from(result));
  // res.send(resJson);
  // res.json(Array.from(result));
  res.render('index', {
    title: '刘德樟首页'
  });
})
app.get('/xiaoshuowenxue', async (req, res) => {
  let strSql = 'select id,name,author,isbn,bookimg,cataory from book where cataory = "小说文学" limit 0,28';
  let result = await sqlQuery(strSql);
  res.json(Array.from(result))
})
app.get('/books/:bookid', async (req, res) => {
  let strSql = 'select * from book where id = ?';
  let bookid = req.params.bookid;
  let result = await sqlQuery(strSql, [bookid]);
  res.json(Array.from(result))
})

module.exports = app;