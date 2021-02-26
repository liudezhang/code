var express = require('express');
var router = express.Router();

// 设置session
router.get('/setSession', (req, res) => {
    // 登录之后，要能够快速获取user的姓名，VIP等级，是否登录
    req.session.isLogin = 'true';
    req.session.username = '刘德樟';
    req.session.vipLevel = 8;
    // 重置有效时间
    // req.session.cookie.maxAge = 1000 * 10
    res.send('登录状态已设置到session中')
})

// 获取session
router.get('/getSession', (req, res) => {
    console.log(req.session);
    if (req.session.isLogin === 'true') {
        res.send('欢迎等级为' + req.session.vipLevel + '的' + req.session.username + '用户' + '<a href="/session/one/exit">退出登录</a>')
    } else {
        res.send('尚未登录');
    }
})

router.get('/one/exit', (req, res) => {
    req.session.destroy(() => {
        // 销毁session
        console.log('销毁session完毕');
    })
    res.send('成功退出！')
})

module.exports = router;