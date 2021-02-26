let events = require('events');
let ent = new events.EventEmitter();
let fs = require('fs');
const {
    on
} = require('process');

ent.on('event', function (eventMsg) {
    console.log('1、吃夜宵')
    console.log(eventMsg);
})

ent.on('event', function () {
    console.log('2、打王者')
})
ent.on('event', function () {
    console.log('3、吃鸡')
})
ent.on('event', function () {
    console.log('4、睡觉')
})


fs.readFile('./hello.txt', {
    flag: 'r',
    encoding: 'utf8'
}, function (err, date) {
    if (err) {
        console.log(err);
    } else {
        console.log(date);
        ent.emit('event', date)
        console.log('one')
    }
})


function ldzReadFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, {
            flag: 'r',
            encoding: 'utf8'
        }, function (err, date) {
            if (err) {
                reject(err);
            } else {
                resolve(date);
            }
        })
    })
}

ldzReadFile('./hello.txt').then(function (date) {
    ent.emit('event', date);
    console.log('two')
})

async function test() {
    let date = await ldzReadFile('./hello.txt');
    ent.emit('event', date)
    console.log('three') 
}
test();