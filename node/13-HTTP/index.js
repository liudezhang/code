/*
 * @Author: your name
 * @Date: 2021-01-06 16:46:08
 * @LastEditTime: 2021-01-08 21:06:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\13-HTTP\index.js
 */

const http = require('http');

//  创建server服务器对象 返回一个 server 实例
let server = http.createServer();
// 监听对当前服务器对象的请求
server.on('request', (req, res) => {
    /* 
       request 请求事件处理函数，需要接收两个参数
            Request 请求对象
                请求对象可以用来获取客户端的一些请求信息，例入请求对象
            Response 响应对象
                响应对象可以用来个客户端发送响应消息
    */
    // 输出路径
    console.log(req.url);
    // 输出请求头
    // console.log(req.headers);
    // 设置字符编码
    res.setHeader("Content-Type", "text/html; charset=UTF-8")

    // response 对象有一个方法：write 可以用来个客户端发送响应数据
    // res.write('刘德樟')
    // write 可以使用多次，但是一定要使用end来结束响应，否则客户端会一直等待
    // 根据路径信息，显示不同的页面内容
    if (req.url == '/') {
        res.end('<h1>首页</h1><br/><img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"/>')
    } else if (req.url == '/gnxw') {
        res.end('<h1>国内新闻</h1>')
    } else if (req.url == '/ylxw') {
        res.end('<h1>娱乐新闻</h1>')
    } else {
        res.end('<h1>404!页面找不到</h1>')
    }
    console.log('您收到一个客户端的请求了');
})

// 服务器监听的端口号
/* 
    绑定端口号，启动服务器
*/
server.listen(1314, () => {
    // 启动监听端口号成功时触发
    console.log('服务器启动成功');
})

// 本机IP   192.168.43.139