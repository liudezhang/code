let express = require('express');
// 实例化路由模块，此路由模块相当于一个小的app实例
// 商城的首页
let router = express.Router()

// 在路由中间件里也可以写一个应用层中间件
router.use((req, res, next) => {
    console.log('判断是否是商城用户');
    next();
})

router.get('/', (req, res) => {
    res.send('商城首页')
})

router.get('/list', (req, res) => {
    res.send('商城列表页')
})

// 导出路由中间件
module.exports = router;