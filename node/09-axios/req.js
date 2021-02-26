/*
 * @Author: your name
 * @Date: 2020-12-19 15:52:12
 * @LastEditTime: 2020-12-20 14:26:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\09-axios\req.js
 */
const axios = require('axios');
const request = require('request');
const fs = require('fs');
const {
    fsWrite,
    fsRead,
    fsDir
} = require('./fs');
const iconv = require('iconv-lite');

// console.log(axios);

/* 
    获取分类里面的电影链接
    根据电影链接获取电影的详细信息
*/

let httpUrl = `https://www.1905.com/vod/list/n_6_t_8/o8p7.html`;

function req(url) {
    return new Promise(function (resolve, reject) {
        request({
            url: url,
            encoding: 'utf-8'
        }, function (err, response, body) {
            if (err) {
                reject(err)
            } else {
                resolve({
                    response,
                    body
                })
            }
        })
    })
}


async function getClassUrl() {
    let {
        response,
        body
    } = await req(httpUrl);
    // console.log(body);
    // 正则匹配
    let reg = /<span class="search-index-L">类型(.*?)<\/p>/igs
    let result = body.match(reg);
    // console.log(result);
    let reg1 = /<a href="javascript\:void\(0\);" onclick="location\.href='(.*?)';return false;" >(.*?)<\/a>/igs
    let result1;
    // console.log(result1);
    let arrClass = []
    while (result1 = reg1.exec(result)) {
        if (result1[2] != "全部") {
            let obj = {
                className: result1[2],
                url: result1[1]
            }
            arrClass.push(obj)
            await fsDir('./movies/' + result1[2])
            getMovies(result1[1], result1[2])
        }
    }
    // console.log(arrClass)
}


// 通过分类获取页面中的电影链接
async function getMovies(url, moviesType) {
    let {
        response,
        body
    } = await req(url);
    let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)".*?><img/igs;
    let res;
    let arrList = [];
    while (res = reg.exec(body)) {
        arrList.push(res[1])
        parsePage(res[1], moviesType)
    }
    // console.log("分类：", moviesType)
    // console.log(arrList);
}


async function parsePage(url, moviesType) {
    let {
        response,
        body
    } = await req(url)

    let reg = /<h1 class="playerBox-info-name playerBox-info-cnName">(.*?)<\/h1>.*?id="playerBoxIntroCon">(.*?)<a.*?导演.*?target="_blank" title="(.*?)" data-hrefexp/igs;
    let res = reg.exec(body)
    // console.log(res[1])
    // console.log(res[2])
    // console.log(res[3])
    let movie = {
        name: res[1],
        brief: res[2],
        daoyan: res[3],
        movieUrl: url,
        moviesType
    }
    let strMovie = JSON.stringify(movie)
    fsWrite('./movies/' + moviesType + "/" + res[1] + ".json", strMovie)
}


getClassUrl();