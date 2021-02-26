/*
 * @Author: your name
 * @Date: 2021-01-05 08:13:40
 * @LastEditTime: 2021-01-07 17:21:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\12-puppeteer\readBook.js
 */


let puppeteer = require('puppeteer');
let fs = require('fs');
const url = require('url')
let {
    fsRead,
    fsWrite
} = require('./fs');
const axios = require('axios');
const {
    title
} = require('process');

(async () => {
    // 调试状态
    let debugOptions = {
        defaultViewport: {
            width: 1400,
            height: 800
        },
        // 设置为有界面
        headless: false,
        // slowMo: 150
    };
    let options = {
        headless: true
    }

    async function readBook() {
        // 读取文本
        let txt = await fsRead('./book.txt');
        // 正则匹配
        let txtZz = /(\{.*?\})/igs;
        let tempRes, i = 0;
        let bookArr = [];
        while (tempRes = txtZz.exec(txt)) {
            // 获取匹配结果
            let jsonStr = tempRes[1];
            // console.log(i + '\t:\t' + jsonStr);
            // 将字符串解析成对象
            let jsonObj = JSON.parse(jsonStr)
            // console.log(i + '\t:\t' + jsonObj.title);
            // 获取连接对象
            // let bookHref = jsonObj.href;
            // console.log(i + '\t:\t' + bookHref);
            // i++;
            bookArr.push(jsonObj)
        }
        return bookArr
    }
    let bookArr = await readBook();
    // console.log(bookArr);
    let index = 0;
    async function downloadBook() {
        // 根据索引值下载书
        // 如果索引值大于书的数量就跳出循环
        if (index == bookArr.length) {
            return '完成';
        }
        let bookObj = await bookArr[index];
        index++;
        // console.log(bookObj.href);
        let browser = await puppeteer.launch(options);
        let page = await browser.newPage();
        await page.goto(bookObj.href);

        // console.log(bookArr);
        // 因为要被点击的对象是JS渲染的内容，所以要等待
        await page.waitForSelector('#table_files tbody td a')
        // 选择被点击的对象
        let res = await page.$('#table_files tbody td a');
        await res.click();
        let aHref = await res.getProperty('href');
        page.close();
        aHref = aHref._remoteObject.value
        page = await browser.newPage();

        // 启用拦截器
        await page.setRequestInterception(true);
        // 监听请求事件 
        await page.on('request', interceptedRequest => {
            // 通过URL模块对请求的地址进行解析 
            let urlObj = url.parse(interceptedRequest.url())
            if (urlObj.hostname == 'ch1-ctc-aa.tv002.com') {
                // console.log('截获地址');
                // console.log(urlObj.href);

                // 下载电子书
                let ws = fs.createWriteStream('./book/' + bookObj.title + '.epub');
                axios.get(urlObj.href, {
                    responseType: 'stream'
                }).then((res) => {
                    res.data.pipe(ws);
                    ws.on('close', () => {
                        console.log('下载已完成:', bookObj.title);
                        downloadBook();
                        page.close();
                    })
                })

                interceptedRequest.abort();
            } else
                interceptedRequest.continue();
        });

        await page.goto(aHref);
        // console.log(aHref);
        await page.waitForSelector('.card-deck .card .fs--1');
        res = await page.$('.card-deck .card .fs--1');
        await res.click();
        // page.close();
        // // 判断请求完成
        // await page.on('requestfinished', (res) => {
        //     console.log("下载已完成" + res.url());
        // })
    }
    downloadBook();
})()

// ch1-ctc-aa.tv002.com