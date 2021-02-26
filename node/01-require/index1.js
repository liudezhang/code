let a = 123;
let b = 456;
let c = 789;
let str = {
    username: '学生'
}
console.log(str);
// exports就是默认导出的对象
exports.a = a;
module.exports.c = c;
// 系统默认设置了：exports = modules.exports
// exports = {user:"刘德樟"}
module.exports = {
    user: '刘德樟'
};
module.exports = {
    str: str,
    a: a,
    b: b,
    c: c
};