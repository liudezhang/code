var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let session = require('express-session');

var app = express();

// 路由中间件
let registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let bookRouter = require('./routes/book');
let pagingRouter = require('./routes/paging')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
// secret 使用加密
app.use(cookieParser('secret'));
// 设置静态目录

app.use(express.static(path.join(__dirname, 'public')));


// 中间件
app.use(session({
  // 加盐
  secret: 'ldz',
  // 设置cookie
  cookie: {
    // 设置有效时间为1周
    // maxAge: 1000000
  },
  // 强制保存session
  resave: true,
  // 是否保存初始状态的session
  saveUninitialized: true
}));


// 路由匹配
app.use('/', indexRouter);
app.use('/users', usersRouter);
// 进入详情页面，必须登录
// 1.引入cookie，session相关的模块
// 2.引入一个判断是否登录的中间件
// 3.登录界面
app.use('/books', bookRouter);
app.use('/paging', pagingRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);





// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;