/*
 * @Author: your name
 * @Date: 2020-12-19 15:16:51
 * @LastEditTime: 2020-12-19 15:30:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\07-OS\os.js
 */

let os = require('os');

console.log(os);

/* 
    os.cpus()
    返回一个对象数组，其中包含有关每个逻辑 CPU 内核的信息。
*/
console.log(os.cpus());

/*
    os.totalmem()
    以整数的形式返回系统的内存总量（以字节为单位）。
*/
console.log(os.totalmem()); // 17012482048

/* 
    os.arch()
    返回为其编译 Node.js 二进制文件的操作系统的 CPU 架构。 可能的值有：'arm'、 'arm64'、 'ia32'、 'mips'、 'mipsel'、 'ppc'、 'ppc64'、 's390'、 's390x'、 'x32' 和 'x64'。
*/
console.log(os.arch()); // x64

/* 
    os.freemem()
    以整数的形式返回空闲的系统内存量（以字节为单位）。
*/
console.log(os.freemem());

/* 
    os.hostname()
    以字符串的形式返回操作系统的主机名。
*/
console.log(os.hostname()); // DESKTOP-U6PE7MV

/* 
    os.networkInterfaces()
    返回一个对象，该对象包含已分配了网络地址的网络接口。
*/
console.log(os.networkInterfaces())

/* 
    os.platform()
    返回标识操作系统平台的字符串。
*/
console.log(os.platform()) // win32