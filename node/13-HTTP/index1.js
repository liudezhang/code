/*
 * @Author: your name
 * @Date: 2021-01-08 10:45:09
 * @LastEditTime: 2021-01-08 17:15:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\13-HTTP\index1.js
 */

let ldzApp = require('./packageHttp');

let app = new ldzApp();
// app.staticDir = './ldz'

app.on('/', (req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end('<h1>这是首页</h1><img src="./static/卡萨丁.jpg">')
})

app.on('/gnxw', (req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    if (req.pathObj.base == 'index') {
        res.end('<h1>国内新闻首页</h1>')
    } else {
        res.end('<h1>国内新闻其他页面</h1>')
    }
})

app.run(80, () => {
    console.log('服务启动成功');
})