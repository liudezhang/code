let mysql = require('mysql');
let axios = require('axios');
let cheerio = require('cheerio');

let page = 2;
let count = 1;

// 配置
let options = {
    host: 'localhost',
    port: '3370', // 可选，默认是3306
    user: 'root',
    password: '1823799296',
    database: 'book'
}

// 创建与数据库的连接对象
let ret = mysql.createConnection(options);

ret.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('数据库链接成功');
    }
})


// 获取第N个页面所有书籍的链接
async function getPageUrl(num) {
    let httpUrl = 'https://sobooks.cc/page/' + num;
    let res = await axios.get(httpUrl);
    // console.log(res.data);
    let $ = cheerio.load(res.data);
    $('#cardslist .card-item .focus>a').each((i, element) => {
        let href = $(element).attr('href');
        // console.log(href);
        getBookInfo(href);
        // 根据地址访问书籍详情页面
    })
}

async function getBookInfo(href) {
    let res = await axios.get(href);
    let $ = cheerio.load(res.data);
    // 书籍图片
    let bookImg = $('.book-info .item .bookpic img').attr('src');
    // 书籍名称
    let bookName = $('.book-info .item .bookinfo li:nth-child(1)').text();
    bookName = bookName.substring(3, bookName.length);
    // 书籍作者
    let author = $('.book-info .item .bookinfo li:nth-child(2)').text();
    author = author.substring(3, author.length);
    // 书籍标签
    let tag = $('.book-info .item .bookinfo li:nth-child(4)').text();
    tag = tag.substring(3, tag.length);
    // 时间
    let time = $('.book-info .item .bookinfo li:nth-child(5)').text();
    time = time.substring(3, time.length);
    // 评分
    let score = $('.book-info .item .bookinfo li:nth-child(6) b').attr('class');
    score = score[score.length - 1];
    // ISBN
    let ISBN = $('.book-info .item .bookinfo li:nth-child(7)').text();
    ISBN = ISBN.substring(5, ISBN.length);
    // 分类
    let cataory = $('#mute-category>a').text().trim();
    // 简介
    let brief = $('.content .article-content').html();
    // console.log(brief);
    // 书籍链接
    let bookUrl = href;

    let attr = [bookName, author, tag, time, score, ISBN, bookImg, cataory, brief, bookUrl];
    // console.log(attr);

    // 插入数据库
    let strSql = 'insert into book (name,author,tag,pubtime,score,isbn,bookimg,cataory,brief,bookurl) values (?,?,?,?,?,?,?,?,?,?)';
    ret.query(strSql, attr, (err, res) => {
        err ? console.log(err) : console.log('数据插入成功');
    })
}

// getPageUrl(1)

async function num() {
    for (let i = 1; i <= 306; i++) {
        getPageUrl(i);
    }
}

num()

// let temp = 'https://sobooks.cc/books/17680.html'