/*
 * @Author: your name
 * @Date: 2021-01-03 20:33:42
 * @LastEditTime: 2021-01-05 17:47:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\12-puppeteer\book.js
 * 爬取电子书
 *  https://sobooks.cc/
 */

let puppeteer = require('puppeteer');
let axios = require('axios');
let url = require('url');
let fs = require('fs')
const request = require('request');
let {
    fsRead,
    fsWrite
} = require('./fs');

let httpUrl = 'https://sobooks.cc/';
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
    let browser = await puppeteer.launch(debugOptions);
    //  目标：获取https://sobooks.cc/,所有书名的电子书的链接
    // 进入网站，获取这个网站的列表页数
    async function getAllNum() {
        let page = await browser.newPage();

        // 监听请求事件，并对请求进行拦截
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            // 通过url模块对请求的地址进行解析
            let urlObj = url.parse(interceptedRequest.url())
            if (urlObj.hostname == 'googleads.g.doubleclick.net')
                // 如果是谷歌的广告请求，那么久放弃当次请求，浪费时间
                interceptedRequest.abort();
            else
                interceptedRequest.continue();
        });

        await page.goto(httpUrl);
        // 获取总页数
        let pageNum = await page.$eval('.pagination ul li:last-child>span', (element) => {
            let text = element.innerHTML
            // 截取字符串，并去除空白
            text = text.slice(1, text.length - 1).trim();
            return text;
        })
        page.close();
        return pageNum
    }
    let pageNum = await getAllNum();
    // console.log(pageNum);

    // 获取列表页的所有链接
    async function pageList(num) {
        let pageListUrl = 'https://sobooks.cc/page/' + num
        let page = await browser.newPage();

        // 监听请求事件，并对请求进行拦截
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            // 通过url模块对请求的地址进行解析
            let urlObj = url.parse(interceptedRequest.url())
            if (urlObj.hostname == 'googleads.g.doubleclick.net')
                // 如果是谷歌的广告请求，那么久放弃当次请求，浪费时间
                interceptedRequest.abort();
            else
                interceptedRequest.continue();
        });

        // 访问列表页地址
        await page.goto(pageListUrl);
        let arrPage = await page.$$eval('#cardslist .card-item .focus>a', (element) => {
            let arr = [];
            element.forEach((item, i) => {
                var obj = {
                    href: item.getAttribute('href'),
                    title: item.getAttribute('title'),
                }

                arr.push(obj);
            })
            // console.log(arr);
            return arr;
        })

        // page.close();
        arrPage.forEach(async (pageObj, i) => {
            // getPageInfo(pageObj)
            let txt = `{"title":"${pageObj.title}","href":"${pageObj.href}"}\n`;
            await fsWrite('./bookHref.txt', txt);
        })
    }
    // 进入每个电子书的详情页获取电子书的地址
    async function getPageInfo(pageObj) {
        let page = await browser.newPage();
        // 监听请求事件，并对请求进行拦截
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            // 通过url模块对请求的地址进行解析
            let urlObj = url.parse(interceptedRequest.url())
            if (urlObj.hostname == 'googleads.g.doubleclick.net')
                // 如果是谷歌的广告请求，那么久放弃当次请求，浪费时间
                interceptedRequest.abort();
            else
                interceptedRequest.continue();
        });
        await page.goto(pageObj.href);
        let length = pageObj.length;

        await page.waitForSelector('.e-secret form .euc-y-i');
        let resA = await page.$('.e-secret form .euc-y-i')
        await resA.focus();
        await page.keyboard.type('2021666');
        let btn = await page.$('.e-secret form .euc-y-s')
        await page.waitForSelector('.e-secret form .euc-y-s');
        await btn.click();
        // 等待加载
        await page.waitForSelector('.article-content .e-secret a');
        let aHref = await page.$eval('.e-secret b a:first-child', (res) => {
            return res.getAttribute('href')
        });
        aHref = await aHref.split('?url=')[1];
        // console.log(aHref);
        // page.close();
        let txt = `{"title":"${pageObj.title}","href":"${aHref}"}\n`;
        // 将获取的的数据保存到book.txt文档里
        await fsWrite('./book.txt', txt);
        // page.close();
    }
    pageList(3)


})()