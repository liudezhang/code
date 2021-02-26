var express = require('express');
// 加密包
var crypto = require('crypto');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/setcookie', (req, res) => {
  // 基础设置cookie，有效期默认为一个会话，浏览器关闭则无效
  // res.cookie('isLogin', 'true');
  res.cookie('isLogin', 'true', {
    // 有效时间（单位毫秒）
    maxAge: 100000,
    // 设置cookie为不可获取，不能操作，但是在浏览器的cookie里可以看到
    // httpOnly: true,
    // 设置加密操作
    signed: true
  })

  res.send('cookie设置成功');
})

router.get('/admin', (req, res) => {
  console.log(req.cookies);
  if (req.cookies.isLogin === 'true' || req.signedCookies.isLogin === 'true') {
    res.send('登录成功')
  } else {
    res.send('登录失败')
  }
})
router.get('/adminSecret', (req, res) => {
  // 加密过后的cookie使用req.signedCookies获取
  console.log(req.signedCookies);
  // res.send('加密cookie')
  res.json(req.signedCookies);
})

// 加密原理解析
router.get('/secret', (req, res) => {
  // 要加密的字符串
  let password = '1823799296';
  // 使用的加密算法
  let sf = crypto.createHash('md5');
  // 对字符串加密
  sf.update(password);
  // 加密的二进制数据以字符串的形式
  let content = sf.digest('hex');
  res.send(content);
})




// 加密函数
function md5Secret(str) {
  let password = str;
  password += 'ldz';
  let sf = crypto.createHash('md5');
  sf.update(password);
  let secretStr = sf.digest('hex');
  return secretStr;
}

// 存放密文和明文的对象
let secretCookie = {};
// 存放密文和明文
function setSecretCookie(str, secretStr) {
  secretCookie[secretStr] = str;
}
// 获取密文
function getSecretCookie(secretStr) {
  return secretCookie[secretStr];
}

// 自己定义加密cookie
router.get('/appSecret', (req, res) => {
  let secretStr = md5Secret('true');
  res.cookie('one', secretStr)
  // 设置将加密的密文和明文内容放置在某个位置
  setSecretCookie('true', secretStr)
  res.send('cookie加密成功' + secretStr);
})

// 获取自己加密的cookie值
router.get('/getAppSecret', (req, res) => {
  // 获取加密之后的密文
  let strSecret = req.cookies.one;
  let content = getSecretCookie(strSecret);
  console.log('解密后one的内容：', content);
  res.send('解密后one的内容：' + content);
})


module.exports = router;