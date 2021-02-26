/*
 * @Author: your name
 * @Date: 2020-12-27 14:37:20
 * @LastEditTime: 2020-12-28 19:46:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\11-echo\kugo.js
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')


async function kuGo() {
    let httpUrl = `https://www.kugou.com/yy/rank/home/1-6666.html?from=rank`;
    let res = await axios.get(httpUrl);
    let data = await res.data;
    // console.log(data);
    let $ = cheerio.load(data);
    $('.pc_temp_main .pc_temp_side div ul li>a').each((i, item) => {
        let href = $(item).attr('href');
        // let title = $(item).attr('title');
        let title = $(item).text().replace(/(<br[^bai>]*>| |\s*)/g, '');
        // console.log(title + '\t:\t' + href);
        // console.log(title)
        download(href, title)
    })

}

async function download(url, title) {
    let httpUrl = url;
    let res = await axios(httpUrl);
    let data = await res.data;
    // console.log(data);
    let $ = cheerio.load(data);
    // console.log('\n' + title + '\n');
    let tle = `${title}\n\n`;
    fs.writeFileSync('./kuGo.txt', tle, {
        flag: 'a',
        encoding: 'utf-8'
    })
    $('.pc_temp_content #rankWrap ul li .pc_temp_songname').each((i, item) => {
        let href = $(item).attr('href')
        let title2 = $(item).attr('title');
        let txt = `${i}\t\t\t${title2}\t\t\t\t${href}\n`;
        fs.writeFileSync('./kuGo.txt', txt, {
            flag: 'a',
            encoding: 'utf-8'
        })
    })
}

kuGo();