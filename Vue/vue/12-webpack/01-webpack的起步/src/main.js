import {age, name, sex, num} from "./js/one";

// console.log(age)
// console.log(name)
// console.log(sex)
// console.log(num(20, 50));

let {addBtn} = require('./js/two')

addBtn();

// 依赖css文件
require('./css/style.css');
// 依赖less文件
require('./css/special.less');
document.writeln('<div>刘德樟</div>')

// 使用vue进行开发
import Vue from 'vue'
// import App from './vue/app'
import App from "./vue/App";

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
