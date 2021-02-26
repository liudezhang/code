/*
 * @Author: your name
 * @Date: 2021-01-03 22:39:02
 * @LastEditTime: 2021-01-05 18:24:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\12-puppeteer\one.js
 */

let puppeteer = require('puppeteer');
let axios = require('axios');
const {
    default: Axios
} = require('axios');
let {
    fsRead,
    fsWrite
} = require('./fs');

// let url = 'https://sobooks.cc/books/17454.html';

(async () => {
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
    async function readTxt() {
        let txtZz = /(\{.*?\})/igs;
        let txt = await fsRead('./bookHref.txt');
        let res, url, i = 0;
        let urlArr = [];
        // console.log(txt.length);
        while (res = txtZz.exec(txt)) {
            let resStr = res[1];
            url = JSON.parse(resStr);
            urlArr.push(url.href);
            open(urlArr[i]);
            i++;
        }

        // console.log(urlArr);

    }
    async function open(url) {
        let page = await browser.newPage();
        await page.goto(url);
        await page.waitForSelector('.e-secret form .euc-y-i');
        let resA = await page.$('.e-secret form .euc-y-i')
        await resA.focus();
        await page.waitForSelector('.e-secret form .euc-y-i');
        await page.keyboard.type('2021666');
        await page.waitForSelector('.e-secret form .euc-y-i');
        let btn = await page.$('.e-secret form .euc-y-s')
        await btn.click();
        // 等待加载
        await page.waitForSelector('.article-content .e-secret a');
        let aHref = await page.$eval('.e-secret b a:first-child', (res) => {
            return res.getAttribute('href')
        });
        aHref = aHref.split('?url=')[1]
        console.log(aHref);
    }

    readTxt();


})()