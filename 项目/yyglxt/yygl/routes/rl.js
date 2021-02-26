var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var sqlQuery = require('../modules/mysql')
var crypto = require('crypto');
let session = require('express-session');


// secret 使用加密
router.use(cookieParser('secret'));
// 中间件
router.use(session({
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

function jiaMi(str) {
    let password = str;
    password += 'ldz';
    let sf = crypto.createHash('md5');
    sf.update(password);
    let secretStr = sf.digest('hex');
    return secretStr;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    // console.log(req.session);
    res.render('rl');
});

// 注册提交的post请求路由
router.post('/register', async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let sql = 'select * from users where email=?';
    let results = await sqlQuery(sql, email);
    // console.log(results.length);
    if (results.length != 0) {
        res.render('info', {
            title: '注册失败',
            content: '邮箱已存在，请登录',
            href: '/rl',
            hrefTxt: '登录'
        });
    } else {
        sql = 'insert into users(username, password, email, grade) VALUES (?,?,?,1)';
        let arr = [username, jiaMi(password), email];
        results = await sqlQuery(sql, arr);
        if (results.affectedRows > 0) {
            res.render('info', {
                title: '注册成功',
                content: '注册成功，请登录',
                href: '/rl',
                hrefTxt: '登录'
            });
        } else {
            res.render('info', {
                title: '注册失败',
                content: '注册失败，请从新注册',
                href: '/rl',
                hrefTxt: '注册'
            });
        }
    }

})

// 登录提交的post请求路由
router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let sql = 'select * from users where email = ? and password = ?';
    let arr = [email, jiaMi(password)];
    let results = await sqlQuery(sql, arr);
    if (results.length == 0) {
        res.render('info', {
            title: '登录失败',
            content: '账号或密码错误，请重新登录',
            href: '/rl',
            hrefTxt: '登录'
        });
    } else {
        sql = 'select username from users where email = ?';
        results = await sqlQuery(sql, [email]);
        let username = results[0].username
        req.session.email = email;
        req.session.password = jiaMi(password);
        req.session.username = username;
        // console.log(req.session);
        res.render('info', {
            title: '登录成功',
            content: '欢迎登录此系统',
            href: '/admin',
            hrefTxt: '后台'
        });
    }
})


// 退出登录路由
router.get('/exit', (req, res) => {
    req.session.destroy();
    res.render('info', {
        title: '退出登录成功',
        content: '即将进入登录页面',
        href: '/rl',
        hrefTxt: '登录'
    });
})

module.exports = router;