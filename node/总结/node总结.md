`Node`：一门后端语言（服务器端的程序语言），能够连接数据库存取数据，能够接受和处理网络请求（服务器的响应，发送请求去获取数据），单线程事件驱动，异步执行，不等待，提高IO（input和output）的处理速度和效率。

服务器：本质上是一台PC主机（Linux系统，windows系统），部署了后端语言的执行环境，并且能够长时间提供网络服务。

### 事件驱动

node本身提供了事件对象，帮助我们快速订阅者模式，或者观察模式，或者事件模式。

~~~js
// 事件的订阅
event.on('饭煮好了',()=>{炒菜});
// 事件的触发
event.emit('干饭');
~~~

### 读写事件

~~~js
// 读
fs.readFile('path',读取配置,(err,data)=>{});
// 写
fs.writeFile('path',写入数据,写入配置,()=>{})
~~~

#### 读写的promise封装

~~~js
let fs = require('fs');
const {
    resolve
} = require('path');

// 读文件封装
/* 
    path：文件地址
    flag：文件操作方式
    encoding：文件字符编码
*/
function fsRead(path, flag = 'r', encoding = 'utf8') {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, {
            flag: flag,
            encoding: encoding
        }, function (err, data) {
            err ? reject(err) : resolve(data);
        })
    })
}
// 写文件封装
/* 
    path:文件地址
    content：要写入的内容
*/
function fsWrite(path, content, flag = 'a', encoding = 'utf8') {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, {
            flag: flag,
            encoding: encoding
        }, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })
    })
}

function fsDir(path) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(path, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve('成功创建目录')
            }
        })
    })
}

// 暴露接口（导出）解构的方法
module.exports = {
    fsRead,
    fsWrite,
    fsDir
};
~~~

#### 使用方式

~~~js
(async function(){
    let data = await fsRead('path');
})()
~~~

### 网络请求数据

request  、axios：效率比较高，局限性比较大

puppeteer：效率低，局限性比较小

重点掌握的是：页面分析，数据存放的位置，以及响应内容。

### 网络响应数据

http.createServer：就可以创建一个服务器去监听某个端口，并且通过请求事件来处理每个发送过来的请求。

server.on('request',(req,res)=>{

​	req：请求数据都会放在请求对象里

​	res：能够做出响应对象

})

### 路由

根据不同的路径去响应不同的内容

~~~js
// 循环匹配正则路径
for (let key in this.reqEvent) {
    let regStr = key;
    let reg = new RegExp(regStr, 'igs');
    if (reg.test(req.url)) {
        resState = true;
        this.reqEvent[key](req, res);
        break;
    }
}
~~~

### 模板

会有个固定样式和结构的HTML模板，根据请求的数据不同，显示页面内容。例如新闻网站

~~~js
function render(options, path) {
    fs.readFile(path, {
        encoding: 'utf-8',
        flag: 'r'
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
            try {
                data = replaceArr(data, options)
                data = replaceVar(data, options)
            } catch (error) {
                console.log(error);
            }
            this.end(data);
        }
    })
}
~~~

