var express = require('express');
var router = express.Router();
let {
  sqlQuery,
  getCataory
} = require('../mysql');


/* GET home page. */
router.get('/', async (req, res) => {
  let page = 1;
  let strSql = `select id,name,author,isbn,bookimg,cataory from book limit ?,28`;
  let arr = [(page - 1) * 28];
  let result = await sqlQuery(strSql, arr);

  //获取总页数
  let sqlStr1 = "select count(id) as num  from book"
  let result1 = await sqlQuery(sqlStr1)
  let pageAll = Math.ceil(result1[0].num / 28);
  let cid = 0
  //设置分页的起始点
  let startPage = (page - 4) < 1 ? 1 : (page - 4);
  let endPage = (page + 5) > pageAll ? pageAll : page + 5;
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