// 错误模块包
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// cookie
var cookieParser = require('cookie-parser');
var session = require('express-session');
// 日志
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionRouter = require('./routes/session');
var app = express();

// view engine setup 视图
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(session({
  // 加盐
  secret: 'ldz',
  // 设置cookie
  cookie: {
    // 设置有效时间为1周
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  // 强制保存session
  resave: true,
  // 是否保存初始状态的session
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// secret 使用加密
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

// 路由匹配
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter)

// catch 404 and forward to error handler 没有匹配的路由报错
// 404中间件
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// 处理错误的中间件
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;