let express = require('express');

let app = express();

// 1、字符串的路由模式
app.get('/', (req, res) => {
  res.send('这是首页');
})

// 2、类字符串的正则模式
// 例如：匹配两个路径abcd或者acd
app.get('/ab?cd', (req, res) => {
  res.send('这是abcd/acd')
})

// 3、正则匹配路径模式
app.get(/\/a\d{5,}/, (req, res) => {
  res.send('新闻页面');
})

// 4、动态路由模式
app.get('/news/:l/:d/:z', (req, res) => {
  // res.send('这是动态路由页面:\t' + req.params.newsid);
  res.send(req.params)
  // {"l":"liu","d":"de","z":"zhang"}
})


module.exports = app;