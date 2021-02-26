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
    res.render('register');
})

router.post('/', async (req, res) => {
    // console.log(req.body.username);
    // console.log(req.body.password);
    let strSql = 'select * from user where username = ?';
    let arr = [req.body.username];
    // console.log(arr);
    let result = await sqlQuery(strSql, arr[0]);
    if (result.length === 0) {
        strSql = 'insert into user (username,`password`,`secretpassword`) VALUES (?,?,?)';
        arr = [req.body.username, req.body.password, jiaMi(req.body.password)];
        result = await sqlQuery(strSql, arr)
        if (result) {
            res.render('info', {
                title: '注册成功',
                content: '注册成功，即将进入',
                href: '/login',
                hrefTxt: '登录'
            })
        }
    } else {
        res.render('info', {
            title: '注册失败',
            content: '请重新注册',
            href: '/register',
            hrefTxt: '注册'
        })
    }
})


module.exports = router;