let app = new Vue({
  el: '#app',
  data: {
    books: [
      {
        id: 1,
        name: '《算法导论》',
        date: '2006-9',
        price: 89.99,
        count: 1,
      }, {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2010-9',
        price: 102.99,
        count: 1,
      }, {
        id: 3,
        name: '《编程珠玑》',
        date: '2005-9',
        price: 105.99,
        count: 1,
      }, {
        id: 4,
        name: '《代码大全》',
        date: '2009-9',
        price: 128.00,
        count: 1,
      },
    ],
  },
  methods: {
    // getFinalPrice(price) {
    //   return '¥' + price.toFixed(2);
    // },
    // 数量增加
    increment(index) {
      // console.log(index);
      this.books[index].count++;
    },
    // 数量减小
    decrement(index) {
      // console.log(index);
      this.books[index].count--;
    },
    // 移除
    removeHandle(index) {
      this.books.splice(index, 1);
    },
  },
  // 计算属性
  computed: {
    totalPrice() {
      let totalPrice = 0;
      // 1. 普通的for循环
      // for (let i = 0; i < this.books.length; i++) {
      //   totalPrice += this.books[i].price * this.books[i].count;
      // }

      // 2. for in  遍历对象
      // for (let key in this.books) {
      //   totalPrice += this.books[key].count * this.books[key].price;
      // }

      // 3. for of  遍历对象
      // for (let i of this.books) {
      //   totalPrice += i.price * i.count;
      // }

      // return totalPrice;

      // 4. 使用高阶函数
      return this.books.reduce(function (preValue, book) {
        return preValue + book.price * book.count;
      }, 0);
    },
  },
  // 过滤器
  filters: {
    showPrice(price) {
      return '¥' + price.toFixed(2);
    },
  },
});




