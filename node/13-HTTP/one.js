let ldzApp = require('./http');
// let ldzApp = require('./lcApp')

let app = new ldzApp();
app.staticDir = '/abc'

app.on('^/$', (req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end('<h1>这是首页</h1><img src="./abc/2.jpg">')
})

app.on('/gnxw', (req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8")
    if (req.pathObj.base == 'index') {
        res.end('这是国内新闻首页<img src="./static/1.jpg">')
    } else {
        // res.setHeader("content-type", "text/html;charset=utf-8")
        res.end('这是国内新闻其他页面')
    }
})

app.on('/movies/[01]', (req, res) => {
    let movies = [{
            name: "我和我的家乡",
            brief: '电影《我和我的家乡》定档2020年国庆，延续《我和我的祖国》集体创作的方式，由张艺谋担当总监制，宁浩担任总导演，张一白担任总策划，宁浩、徐峥、陈思诚、闫非&彭大魔、邓超&俞白眉分别执导五个故事。',
            author: '葛优,黄渤',
            list: ['刘德樟', '毕家豪', '刘志强'],
            stars: [{
                    name: '刘德樟',
                    sex: '男'
                },
                {
                    name: '李寒惠',
                    sex: '女'
                },
                {
                    name: '毕家豪',
                    sex: '男'
                },
                {
                    name: '候优美',
                    sex: '女'
                },
            ]
        },
        {
            name: '一秒钟',
            brief: '影片讲述了没赶上电影场次的张九声与刘闺女因一场电影结下了不解之缘的故事。故事灵感来源于张艺谋导演早期经历，是其一贯对文化展开追忆和寻根的风格。',
            author: '张译,范伟',
            list: ['刘德樟', '毕家豪', '刘志强'],
            stars: [{
                    name: '刘德樟',
                    sex: '男'
                },
                {
                    name: '李寒惠',
                    sex: '女'
                },
                {
                    name: '毕家豪',
                    sex: '男'
                },
                {
                    name: '候优美',
                    sex: '女'
                },
            ]
        }
    ]
    let index = req.pathObj.base;
    // res.end(movies[index].name);
    res.render(movies[index], './template/index.html');
})

app.run(80, () => {
    console.log('服务器已启动');
})