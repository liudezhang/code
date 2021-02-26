var express = require('express');
var router = express.Router();
// 文件上传中间件
var multer = require('multer');
let fs = require('fs');

// 初始化上传对象
let upload = multer({
    dest: './public/upload/'
});


router.get('/', (req, res) => {
    res.render('upload', {
        title: '图片上传',
        content: '上传'
    })
})

router.get('/ajax', (req, res) => {
    res.render('ajaxUpload');
})

// 如果上传单个文件，可调用 upload.single('imgName') 方法，并且将表单文件的name值传入
router.post('/', upload.single('imgName'), function (req, res, next) {
    console.log(req.file);
    let oldPath = req.file.destination + '/' + req.file.filename;
    let newPath = req.file.destination + '/' + req.file.originalname;
    // 使用fs重命名
    fs.rename(oldPath, newPath, () => {
        console.log('改名成功');
    })
    res.send('<h1>上传成功</h1><img src="./upload/' + req.file.originalname + '"/>')
});


router.post('/ajax', upload.single('imgInput'), (req, res) => {
    // console.log(req.file);
    let oldPath = req.file.destination + '/' + req.file.filename;
    let newPath = req.file.destination + '/' + req.file.originalname;
    // 使用fs重命名
    fs.rename(oldPath, newPath, () => {
        console.log('改名成功');
    })
    res.json({
        state: 'ok',
        url: '<img src="/upload/' + req.file.originalname + '"/>'
    })
    // res.send('<img src="./upload/' + req.file.originalname + '"/>')
})



module.exports = router;