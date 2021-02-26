let express = require('express');
let session = require('express-session')
var crypto = require('crypto');
const {
    sqlQuery
} = require('../mysql');
let router = express.Router();

function jiaMi(str) {
    let password = str;
    password += 'ldz';
    let sf = crypto.createHash('md5');
    sf.update(password);
    let secretStr = sf.digest('hex');
    return secretStr;
}

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/', async (req, res) => {
    console.log(req.body.username);
    console.log(jiaMi(req.body.password));
    let strSql = 'select * from user where username = ? and secretpassword = ?'
    let arr = [req.body.username, jiaMi(req.body.password)];
    // console.log(arr);
    let result = await sqlQuery(strSql, arr);
    if (result.length != 0) {
        let user = result[0].username;
        req.session.username = user;
        // req.session.cookie.maxAge = 1000000
        res.render('info', {
            title: '登录成功',
            content: '账号密码正确，即将进入首页',
            href: '/',
            hrefTxt: '首页'
        })
    } else {
        res.render('info', {
            title: '登录失败',
            content: '账号或密码错误，请重新登录',
            href: '/login',
            hrefTxt: '登录'
        })
    }

    // res.send('接收用户信息')
})


module.exports = router;