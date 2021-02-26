# NPM上传包

### 1、创建文件夹

### 2、npm包的初始化

~~~js
npm init
~~~

### 3、npm包的信息配置

~~~js
{
  "name": "fspackage",
  "version": "0.1.5",
  "description": "将原生的fs模块进行promise封装，可以快速德使用async_await模式",
  "main": "fs.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "fs",
    "promise封装"
  ],
  "author": "刘德樟",
  "license": "ISC"
}
~~~

### 4、注册npm官网账号

### 5、本机登录npm

~~~js
npm login
~~~

### 6、发布npm包

~~~js
npm publish
~~~



