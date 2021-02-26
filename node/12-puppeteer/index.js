/*
 * @Author: your name
 * @Date: 2020-12-27 16:17:19
 * @LastEditTime: 2021-01-03 22:41:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\12-puppeteer\index.js
 */
let puppeteer = require('puppeteer');

async function test() {
    //puppeteer.launch实例开启浏览器，
    //可以传入一个options对象，可以配置为无界面浏览器，也可以配置为有界面浏览器
    //无界面浏览器性能更高更快，有界面一般用于调试开式
    let options = {
        //设置视窗的宽高
        defaultViewport: {
            width: 1400,
            height: 800
        },
        //设置为有界面，如果为true，即为无界面
        headless: false,
        // 设置放慢每个步骤的毫秒数
        slowMo: 250,
    }
    let browser = await puppeteer.launch(options)
    //打开新页面
    let page = await browser.newPage()
    //访问页面
    await page.goto("https://www.dytt8.net/index.htm");
    //截屏
    //await page.screenshot({path: 'screenshot.png'});
    //获取页面内容
    //$$eval函数使得，我们的回调函数可以运行在浏览器中，并且可以通过浏览器的方式进行输出
    let elements = await page.$$eval("#menu li a", (elements) => {
        //console.log(elements)
        //创建一个数组去收集元素的信息，这里我们需要收集地址和内容
        let eles = []
        elements.forEach(function (item, i) {
            //console.log(item.innerText);
            if (item.getAttribute("href") != "#") {
                var eleObj = {
                    href: item.getAttribute("href"),
                    text: item.innerText
                }
                eles.push(eleObj)
            }

            console.log(eleObj)
        })
        return eles
    })
    //浏览器可以监听控制台的输出
    // page.on('console',function(eventMsg){
    //     console.log(eventMsg.text())
    // })
    //打开国内的页面
    // let gnPage = await browser.newPage()
    // await gnPage.goto(elements[2].href)
    // console.log(elements)

    /* 
        获取页面对象
    */
    // 通过点击页面跳转的方式
    // elementHandles = await page.$$('#menu li a');
    // elementHandles[2].click();
    // 通过表单进行搜索
    inputEle = await page.$('.searchl .formhue');
    // 让光标定位到输入框
    await inputEle.focus();
    // 往输入框输入内容
    await page.keyboard.type('蜘蛛侠');
    // 取消冒泡
    /* 
        因为第一次点击会进入广告这个点击事件是冒泡事件所以在这里监听点击事件取消冒泡
    */
    await page.$eval('.bd3rl .searchr', (element) => {
        element.addEventListener('click', (event) => {
            event.cancelBubble = true;
        })
    })
    // 点击按钮
    let btnEle = await page.$('.searchr input[name="Submit"]')
    await btnEle.click();
}
test()