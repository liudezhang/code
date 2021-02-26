let {
    write,
    read,
    readdir
} = require('ldzfs');

readdir('../').then((files) => {
    console.log(files);
})

async function test() {
    let files = await readdir('../../');
    console.log(files);
}
test();