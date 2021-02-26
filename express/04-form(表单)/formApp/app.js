var express = require('express');
var path = require('path');
var queryMysql = require('./mysql');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

/* 
    解析post提交的数据要有的
*/
app.use(express.urlencoded(
  /* {
    extended: false
  } */
))

app.get('/', (req, res) => {
  // res.render('formGet.ejs')
  // res.render('formPost.ejs')
  res.render('index.ejs')
})

app.get('/get', (req, res) => {
  res.render('formGet.ejs');
})
app.get('/post', (req, res) => {
  res.render('formPost.ejs');
})

/* 
    提取表单提交过来的数据 
*/
app.get('/search', (req, res) => {
  console.log(req.url);
  // 提取问号后面的字符串
  let queryStr = req.url.split('?')[1];
  // 对表单提交的键值对进行分割
  let keyValueArr = queryStr.split('&');
  // 设置一个query对象，循环将键值对以对象形式保存
  let query = {};
  keyValueArr.forEach((item, i) => {
    let key = item.split('=')[0];
    let value = item.split('=')[1];
    query[key] = value;
  })
  console.log(query.searchKey);
  console.log(query.username);
  console.log(query);
  res.send('搜索页面')
})

// 使用express自带的get获取数据方式
app.get('/searchOne', (req, res) => {
  /* 
    express在req对象上直接封装好了query属性
  */
  console.log(req.query);
  res.send('search1')
})


// 链接数据库查找
app.get('/searchBook', async (req, res) => {
  let sqlStr = 'select id,name,author from book where name like "%' + req.query.username + '%"';
  let result = await queryMysql(sqlStr);
  console.log(Array.from(result));
  res.json(Array.from(result));
})

// ajax提交数据
app.get('/ajax', (req, res) => {
  res.render('ajaxGet.ejs')
})


/* 
    解析post提交的数据
*/
app.post('/searchPost', (req, res) => {
  // 注意：post提交的数据不在query属性上，在body属性上，而且需要 app.use(express.urlencoded());
  // console.log(req.query);
  console.log(req.body);
  res.send('提交成功')
})


/* 
    登录
*/
app.get('/login', (req, res) => {
  res.render('login.ejs');
})
app.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sqlStr = `select * from user where username = ? and password = ? `
  let arr = [username, password];
  console.log(arr);
  let result = await queryMysql(sqlStr, arr);
  if (result.length === 0) {
    res.send('登录失败')
  } else {
    res.send('登录成功')
  }
})

module.exports = app;