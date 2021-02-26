/* 
    输入输出
*/
// 导入readline包
const {
    fsWrite
} = require('../02-fs/fs');
let readline = require('readline');

// 实例化接口对象
let r1 = readline.createInterface({
    output: process.stdout,
    input: process.stdin
})

// r1.question('今晚你吃了什么？', function (answer) {
//     console.log('答复：', answer)
//     // 执行完后结束
//     r1.close();
// })

r1.on('close', function () {
    process.exit(0);
})

// 封装
function Question(title) {
    return new Promise((resolve, reject) => {
        r1.question(title, function (answer) {
            resolve(answer);
        })
    })
}

async function createPackage() {
    let name = await Question('你的包名叫什么？')
    let description = await Question('你的包的描述信息是什么？')
    let main = await Question('你的包主程序入口是什么？')
    let author = await Question('你的包的作者是谁？')

    let content = `{
        "name": "${name}",
        "version": "1.0.0",
        "description": "${description}",
        "main": "${main}",
        "scripts": {
          "test": "echo \\"Error: no test specified\\" && exit 1"
        },
        "author": "${author}",
        "license": "ISC",
        "dependencies": {
          "jquery": "^3.5.1",
          "request": "^2.88.2"
        }
      }`;

    await fsWrite('package.json', content, 'w+');
    process.exit();
}

createPackage();