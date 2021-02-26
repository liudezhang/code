let express = require('express');
let router = express.Router();
let {
    sqlQuery,
    getCataory
} = require('../mysql');

// 判断是否登录的中间件
function isLoginMid(req, res, next) {
    if (req.session.username == undefined) {
        res.render('info', {
            title: '未登录',
            content: '尚未登录，请进入登录页面',
            href: '/login',
            hrefTxt: '登录'
        })
    } else {
        // 已登录进入正常页面
        next();
    }
}

router.get('/:bookid', isLoginMid, async (req, res) => {
    let strSql = 'select * from book where id = ?';
    let bookid = req.params.bookid;
    let result = await sqlQuery(strSql, [bookid]);

    let options = {
        book: result[0],
        cataorys: await getCataory(),
    }
    res.render('bookinfo.ejs', options);
})



module.exports = router;