const fs = require('fs');

fs.readFile('./hello.txt', {
    flag: 'r',
    encoding: 'utf8'
}, function (err, date) {
    if (err) {
        console.log(err);
    } else {
        console.log(date)
    }
})