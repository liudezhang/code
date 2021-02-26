var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 注册登录路由
var registerRouter = require('./routes/rl');
// 用户路由
var adminRouter = require('./routes/admin/admin');
// 提示路由
var infoRouter = require('./routes/info');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// secret 使用加密
app.use(cookieParser('secret'));
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 前台路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 注册登录模板
app.use('/rl', registerRouter);
// 后台路由
app.use('/admin', adminRouter);
// 提示模板
app.use('/info', infoRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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