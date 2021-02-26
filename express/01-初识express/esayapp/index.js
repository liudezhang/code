let express = require('express');

let app = express();

app.get('/', (reg, res) => {

    res.end('<h1>刘德樟</h1>')
})

app.listen(8888, () => {
    console.log('服务器启动完成');
})