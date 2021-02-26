/*
 * @Author: your name
 * @Date: 2020-12-26 21:11:23
 * @LastEditTime: 2020-12-27 14:17:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\11-echo\index.js
 */

/* 
   目标：下载音乐
   1、获取音乐相关的信息，通过音乐相关的信息获取mp3地址
   2、如何获取大量的音乐信息，通过音乐的列表
   3、通过音乐的分类页，获取音乐列表
*/

const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function getPage(num) {
    let httpUrl = 'http://www.app-echo.com/api/recommend/sound-day?page=' + num;
    let res = await axios.get(httpUrl)
    // console.log(res.data.list);
    res.data.list.forEach((item, index) => {
        let title = item.sound.name;
        let mp3Url = item.sound.source;
        let fileName = path.parse(mp3Url).name;

        let content = `${title},${mp3Url},${fileName}\n`
        fs.writeFile('music.txt', content, {
            flag: 'a'
        }, () => {
            console.log('写入完成:' + title);
        })
        // console.log(fileName);
        // console.log(title);
        // console.log(mp3Url);
        download(mp3Url, fileName);
    });
}

async function download(mp3Url, fileName) {
    axios.get(mp3Url, {
        responseType: 'stream'
    }).then((res) => {
        let filePath = fs.createWriteStream('./mp3/' + fileName + '.mp3')
        res.data.pipe(filePath)
    })
}
getPage(6)