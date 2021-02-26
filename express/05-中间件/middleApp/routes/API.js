let express = require('express');
let sqlQuery = require('../mysql');
// 实例化路由模块，此路由模块相当于一个小的app实例
// 提供前端ajax请求的接口
let api = express.Router()

// 获取所有分类
async function getCataory() {
    let sqlStr = 'select * from classify'
    let result = await sqlQuery(sqlStr);
    return Array.from(result);
}

// 允许前端跨域请求的中间件
api.use((req, res, next) => {
    // 允许任何请求访问
    res.append('Access-Control-Allow-Origin', '*');
    // 允许任何请求类型访问
    res.append('Access-Control-Allow-Content-Type', '*');
    next();
})

// 提供某某分类下的，第N页book的数据
api.get('/:cid/:pid', async (req, res) => {
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
    // for (let i = 0; i < options.books.length; i++) {
    //     console.log(options.books[i].id + '\n' + options.books[i].name);
    // }

    res.json(options);
})


// 导出路由中间件
module.exports = api;