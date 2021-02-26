var express = require('express');
var path = require('path');

// 引入路由中间件
let router = require('./routes/mall');
let api = require('./routes/API')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// use是添加中间件
/* 
    一个use可以添加多个中间件
*/
/*********************   应用层中间件   **********************/
app.use((req, res, next) => {
  res.addNum = (a, b) => {
    return a + b
  }
  console.log('访问任何页面，此函数都会被调用');
  // 一定要执行next() 否则不会执行下一步会一直在刷新
  next();
})

// 封装一个获取get请求的中间件
app.use((req, res, next) => {
  // 提取问号后面的字符串
  let splitRes = req.url.split('?')
  // console.log(splitRes);
  if (splitRes.length > 0 && splitRes[1] != undefined) {
    let queryStr = splitRes[1];
    // 对表单提交的键值对进行分割
    let keyValueArr = queryStr.split('&');
    // 设置一个query对象，循环将键值对以对象形式保存
    let query = {};
    keyValueArr.forEach((item, i) => {
      let key = item.split('=')[0];
      let value = item.split('=')[1];
      query[key] = value;
    })
    // 添加到req对象里
    req.ldzQuery = query
    next();
  } else {
    next();
  }
})

/*********************   路由中间件   **********************/
// 实例化路由模块，此路由模块相当于一个小的app实例
// 商城的首页
// let router = express.Router()
// router.get('/', (req, res) => {
//   res.send('商城首页')
// })

// router.get('/list', (req, res) => {
//   res.send('商城列表页')
// })

app.use('/mall', router);
app.use('/api', api);




app.get('/', (req, res) => {
  console.log(req.ldzQuery);
  res.send('这是首页' + res.addNum(10, 20));
})
module.exports = app;