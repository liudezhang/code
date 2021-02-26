let express = require('express');
let router = express.Router();

let {
    sqlQuery,
    getCataory
} = require('../mysql');

// 设置分页页面
router.get('/:cid/page/:pid', async (req, res) => {
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

module.exports = router;