let sqlQuery = require('./mysql');
let express = require('express');
// 实例对象
let app = express();
// 使用ejs模板来渲染页面
let ejs = require('ejs');
// 将模板引擎与express应用相关联
app.set('views', 'views'); // 设置视图的对应目录
app.set('view engine', 'ejs'); // 设置默认的模板引擎
app.set('ejs', ejs.__express); // 定义模板引擎



app.get('/', async (req, res) => {
  //  插入变量
  let options = {
    title: 'liudezhang首页',
    articleTitle: '<h1>网站标题</h1>'
  }
  res.render('index', options);
})
app.get('/tj', async (req, res) => {
  // 条件
  let option = {
    'username': '刘德樟',
    'sex': '男'
  }
  res.render('condition.ejs', option)
})
app.get('/xh', async (req, res) => {
  // 循环
  let stars = ['<h1>小说文学</h1>', '历史传记', '人文社科', '励志成功', '经济管理', '学习教育', '生活时尚', '英文原版', '武侠玄幻', '都市言情']
  let options = {
    stars: stars
  }
  res.render('xh.ejs', options);
})

module.exports = app;