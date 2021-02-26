/* 
    数组二进制的存储
    1、数组不能进行二进制数据的操作
    2、js数组不像Java、Python的语言效率高
    3、buffer内存空间开辟出固定大小的内存
*/


// 将字符串 转成buffer对象
let str = 'HelloWorld'

let buf = Buffer.from(str);

console.log(buf);

// 输出buffer

console.log(buf.toString())


// 开辟一个空的buffer（缓冲区）
// 安全 效率低  清空数据
let buf1 = Buffer.alloc(20);
buf1[0] = 255
console.log(buf1)


// 不安全 效率高 直接在内存中给你一块地址（不清空数据）
let buf2 = Buffer.allocUnsafe(20);
console.log(buf2);