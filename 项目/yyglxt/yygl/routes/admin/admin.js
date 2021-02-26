var express = require('express');
var router = express.Router();
var userRouter = require('./user');
var newsRouter = require('./news');
var doctorsRouter = require('./doctors');
var patientsRouter = require('./patients');

// 判断是否登录的中间件
function permisson(req, res, next) {
    if (req.session.email === undefined) {
        // 未登录，返回至登录页
        res.render('info', {
            title: '未登录',
            content: '请重新登录，即将进入登录页',
            href: 'rl',
            hrefTxt: '登录'
        })
    } else {
        // 已登录，正常进入
        next()
    }
}



router.get('/', permisson, function (req, res, next) {
    // console.log(req.session);
    let username = req.session.username;
    // 后台首页
    res.render('admin/admin', {
        username
    });
});


// 后台用户管理
router.use('/user', userRouter);
// 后台新闻管理
router.use('/news', newsRouter);
// 后台医生管理
router.use('/doctors', doctorsRouter);
// 后台患者管理
router.use('/patients', patientsRouter);

module.exports = router;