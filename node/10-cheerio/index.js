/*
 * @Author: your name
 * @Date: 2020-12-20 14:30:20
 * @LastEditTime: 2020-12-29 09:43:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\10-cherrio\index.js
 * cheerio是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序
 */
const cheerio = require("cheerio");
const axios = require('axios')
const fs = require('fs')
const url = require('url')
const path = require('path')
//获取HTML文档的内容，内容的获取跟jquery一样

let httpUrl = "https://www.doutula.com/article/list/?page=1"


//将延迟函数封装成promise对象
function lcWait(milliSecondes) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("成功执行延迟函数，延迟：" + milliSecondes)
        }, milliSecondes)
    })
}

//获取页面总数
async function getNum() {
    res = await axios.get(httpUrl)
    let $ = cheerio.load(res.data)
    let btnLength = $('.pagination li').length;
    let allNum = $('.pagination li').eq(btnLength - 2).find('a').text()
    //console.log(allNum)
    return allNum
}

async function spider() {
    //获取所有的页面总数
    let allPageNum = await getNum()
    for (let i = 1; i <= allPageNum; i++) {
        await lcWait(3000 * i)
        getListPage(i)
    }
}

async function getListPage(pageNum) {
    let httpUrl = "https://www.doutula.com/article/list/?page=" + pageNum;
    let res = await axios.get(httpUrl)
    //console.log(res.data)
    //cheerio解析html文档
    let $ = cheerio.load(res.data)
    //获取当前页面的所有的表情页面的链接
    $('#home .col-sm-9>a').each(async (i, element) => {
        let pageUrl = $(element).attr('href');
        let title = $(element).find('.random_title').text()
        let reg = /(.*?)\d/igs;
        title = reg.exec(title)[1];
        fs.mkdir('./img/' + title, function (err) {
            if (err) {
                //console.log(err)
            } else {
                console.log("成功创建目录：" + './img/' + title)
            }
        });
        //console.log(title)
        await lcWait(50 * i)
        parsePage(pageUrl, title)
    })
}



async function parsePage(pageUrl, title) {
    let res = await axios.get(pageUrl);
    let $ = cheerio.load(res.data)
    $('.pic-content img').each(async (i, element) => {
        let imgUrl = $(element).attr('src')

        //console.log(path.parse(imgUrl))
        extName = path.extname(imgUrl)
        //图片写入的路径和名字
        let imgPath = `./img/${title}/${title}-${i}${extName}`
        //创建写入图片流
        let ws = fs.createWriteStream(imgPath)
        axios.get(imgUrl, {
            responseType: 'stream'
        }).then(function (res) {
            res.data.pipe(ws)
            console.log("图片加载完成：" + imgPath)
            //关闭写入流
            res.data.on('close', function () {
                ws.close()
            })
        })

    })
}

spider()