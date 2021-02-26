let http = require('http')
let path = require('path')
let url = require('url')
let fs = require('fs')

class ldzApp {
    constructor() {
        this.server = http.createServer()
        // 请求事件，以对象形式存放
        this.reqEvent = {
            // "/": () => {},
            // "/static": () => {},
        };
        this.staticDir = './static';

        this.server.on('request', (req, res) => {
            // 解析路径
            let pathObj = path.parse(req.url);
            req.pathObj = pathObj;
            res.render = render;
            let resState = false;

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
            if (!resState) {
                if (pathObj.dir === this.staticDir) {
                    res.setHeader("content-type", this.getContentType(pathObj.ext))
                    let rs = fs.createReadStream('./static/' + pathObj.base)
                    rs.pipe(res)
                } else {
                    res.setHeader("content-type", "text/html;charset=utf-8")
                    res.end('<h1>404!页面找不到</h1>')
                }
            }

        })
    }
    on(url, fn) {
        this.reqEvent[url] = fn
    }
    run(port, callback) {
        this.server.listen(port, callback)
    }
    getContentType(extName) {
        switch (extName) {
            case ".jpg":
                return "image/jpeg";
            case ".html":
                return "text/html;charset=utf-8";
            case ".js":
                return "text/javascript;charset=utf-8";
            case ".json":
                return "text/json;charset=utf-8";
            case ".gif":
                return "image/gif";
            case ".css":
                return "text/css"
        }
    }
}

function render(options, path) {
    fs.readFile(path, {
        encoding: 'utf-8',
        flag: 'r'
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data = replaceArr(data, options)
            // console.log(data);
            data = replaceVar(data, options)

            this.end(data);
        }
    })
}

function replaceVar(data, options) {
    // 匹配普通的变量，并且替换内容
    let reg = /\{\{(.*?)\}\}/igs
    let result;
    // console.log(options);
    while (result = reg.exec(data)) {
        // 去除两边空白字符串
        let strKey = result[1].trim();
        // console.log(strKey);
        let strValue = eval('options.' + strKey);
        // console.log(strValue);
        data = data.replace(result[0], strValue);
    }
    return data
}

function replaceArr(data, options) {
    // 匹配循环的变量，并且替换循环的内容
    let reg = / \{\%for \{(.*?)\} \%\}(.*?)\{\%endfor\%\}/igs
    while (result = reg.exec(data)) {
        let strKey = result[1].trim();
        // 通过key值获取数组
        let strValueArr = options[strKey];
        let listStr = '';
        strValueArr.forEach((item, i) => {
            // 替换每一项内容里的变量
            listStr = listStr + replaceVar(result[2], {
                "item": item
            });
        });
        data = data.replace(result[0], listStr);
    }
    return data
}

module.exports = ldzApp;