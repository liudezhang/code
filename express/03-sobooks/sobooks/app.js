var express = require('express');
let sqlQuery = require('./mysql');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get('/', async (req, res) => {
  let page = 1;
  let strSql = `select id,name,author,isbn,bookimg,cataory from book limit ?,28`;
  let arr = [(page - 1) * 28]
  let result = await sqlQuery(strSql, arr);

  //获取总页数
  let sqlStr1 = "select count(id) as num  from book"
  let result1 = await sqlQuery(sqlStr1)
  let pageAll = Math.ceil(result1[0].num / 28);
  let cid = 0
  //设置分页的起始点
  let startPage = (page - 4) < 1 ? 1 : (page - 4);
  let endPage = (page + 5) > pageAll ? pageAll : page + 5;
  let options = {
    books: Array.from(result),
    cataorys: await getCataory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage
  }
  res.render('bookIndex.ejs', options);
})

app.get('/books/:bookid', async (req, res) => {
  let strSql = 'select * from book where id = ?';
  let bookid = req.params.bookid;
  let result = await sqlQuery(strSql, [bookid]);
  // console.log(result);
  // res.send(bookid)
  let options = {
    book: result[0]
  }
  res.render('bookinfo.ejs', options);
})

// // 设置分类页面的路由
// app.get('/paging/:cid', async (req, res) => {
//   let sqlStr = 'select id,name,bookimg,author,cataory from book where cataory in(select cataory from book where id = ?) limit 0,28'
//   let arr = [req.params.cid];
//   let result = await sqlQuery(sqlStr, arr);
//   let options = {
//     books: Array.from(result),
//     cataorys: await getCataory()
//   }
//   res.render('bookIndex.ejs', options)
// })


// 获取所有分类
async function getCataory() {
  let sqlStr = 'select * from classify'
  let result = await sqlQuery(sqlStr);
  return Array.from(result);
}

// 设置分页页面
app.get('/paging/:cid/page/:pid', async (req, res) => {
  let page = parseInt(req.params.pid);
  let sqlStr;
  let result;
  let arr;
  let sqlStr1;
  let cid = req.params.cid;
  if (cid == 0) {
    sqlStr = 'select id, name, bookimg, author, cataory from book limit ?, 28 '
    arr = [(page - 1) * 28];
    result = await sqlQuery(sqlStr, arr);
    sqlStr1 = 'select count(id) as num from book';
  } else {
    sqlStr = 'select id, name, bookimg, author, cataory from book where cataory in (select classify from classify where id = ?) limit ?, 28 '
    arr = [req.params.cid, (page - 1) * 28];
    result = await sqlQuery(sqlStr, arr);
    sqlStr1 = 'select count(id) as num from book where cataory in (select classify from classify where id = ?)';
  }
  // 获取总页数
  let result1 = await sqlQuery(sqlStr1, arr);
  let pageAll = Math.ceil(result1[0].num / 28);
  // 设置分页起始点
  let startPage = (page - 4) < 1 ? 1 : (page - 4);
  let endPage = (page + 5) > pageAll ? pageAll : (page + 5);
  let options = {
    books: Array.from(result),
    cataorys: await getCataory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage
  }
  res.render('bookIndex.ejs', options);
})


module.exports = app;