# 写法不同

ES5 正常写法

```javascript
getAjax(url, (res) => {});
```

Promise

```javascript
get(url).then((res) => {});
```

async await

```js
(async () => {
  let res = await get(url);
})();
```

总结：

- ES5 写法和 Promise 写法，主要区别在写法的不同，可以让回调函数，划分出去再.then 的函数里去执行，使得代码更加清楚、简洁，也可以将两个不同的参数划分开来写。
- async 和 promise 的区别，主要在于 async 是 promise 的语法糖，这种形式的写法在底层编译之后会自动转换成 promise 的写法

# promise的实现原理

promise需要实现的功能

~~~javascript
function fn(resolve,reject){
  setTimeout(()=>{
    if(true){
      resolve();
    }else{
      reject();
    }
  })
}

var p1 = new LcPromise(fn)

p1.then(function(res){
  document.body.style.background = "greenyellow"
  console.log("这是成功做的事情")
  console.log(res)
})

p1.catch(function(res){
  document.body.style.background = "pink"
  console.log("这是失败做的事情")
  console.log(res)
})
~~~

p1  promise 对象发送了异步操作，必然会有一个未来要执行的事件。这个过程由传入的函数对象fn执行。函数fn里必然需要有成功执行和失败执行的函数

1.  创建类构造对象

	~~~javascript
	class LcPromise{
	    constructor(fn) {
	        //将成功的事件函数集成在successList数组里
	        this.successList  = [];
	        //这里将所有的失败函数集成到failList里
	        this.failList = []
	        //pending,fullfilled,rejected
	        this.state = "pending"
	        //传入的函数对象,(异步操作的函数内容)						
	        fn(this.resolveFn.bind(this),this.rejectFn.bind(this))
	    }
	}
	~~~

	构造函数的作用：

	-   声明成功函数的数组对象
	-   声明失败函数的数组对象
	-   定义初始化状态
	-   调用传入进行异步内容的函数（在未来有成功的结果时调用传入的成功函数，在未来失败的时调用传入进行的失败函数）

	

2.  传入成功或者失败时需要调用的函数

	~~~JavaScript
	class LcPromise{
	    constructor(fn) {
	      //将成功的事件函数集成在successList数组里
	      this.successList  = [];
	      //这里将所有的失败函数集成到failList里
	      this.failList = []
	      //pending,fullfilled,rejected
	      this.state = "pending"
	      //传入的函数对象,(异步操作的函数内容)
	      fn(this.resolveFn.bind(this),this.rejectFn.bind(this))
	  }
	  then(successFn,failFn){
	      if(typeof successFn=='function'){
	        this.successList.push(successFn)
	      }
	      if(typeof failFn=='function'){
	        this.failList.push(failFn)
	      }
	  }
	  catch(failFn){
	      if(typeof failFn=='function'){
	        this.failList.push(failFn)
	      }
	  }
	}
	~~~

	作用：

	-   将成功和失败的函数传入成功和失败的的数组里

	

3.  定义调用成功和失败的函数

	~~~JavaScript
	class LcPromise{
	    constructor(fn) {
	      //将成功的事件函数集成在successList数组里
	      this.successList  = [];
	      //这里将所有的失败函数集成到failList里
	      this.failList = []
	      //pending,fullfilled,rejected
	      this.state = "pending"
	      //传入的函数对象,(异步操作的函数内容)
	      fn(this.resolveFn.bind(this),this.rejectFn.bind(this))
	    }
	  then(successFn,failFn){
	    if(typeof successFn=='function'){
	      this.successList.push(successFn)
	    }
	    if(typeof failFn=='function'){
	      this.failList.push(failFn)
	    }
	  }
	  catch(failFn){
	    if(typeof failFn=='function'){
	      this.failList.push(failFn)
	    }
	  }
	  resolveFn(res){
	    this.state = "fullfilled"
	    this.successList.forEach(function(item,index){
	      //将成功的事件循环调用
	      item(res)
	    })
	  }
	  rejectFn(res){
	    this.state = 'rejected'
	    //注册到的失败所有事件进行调用
	    this.failList.forEach(function(item,index){
	      item(res)
	    })
	
	    throw Error(res);
	  }
	}
	~~~

	作用：

	- 成功时调用成功数组里所有的函数，失败时调用失败数组里所有的函数

# 应用

如何将 promise 与 async 和 await 结合使用

典型异步读写的回调操作

~~~JavaScript
fs.readFile(path,{flag:'r',encoding:'utf-8'},(err,data)=>{
    if(err){
        // console.log(err)
        // 失败执行的内容
        reject(err)
    }else{
        // console.log(data)
        // 成功执行的内容
        resolve(data)
    }
})
~~~

转换成 promise 对象

~~~javascript
new Promise((resolve,reject)=>{
    fs.readFile(path,{flag:'r',encoding:'utf-8'},(err,data)=>{
        if(err){
            reject(err)
        }else{
            resolve(data)
        }
    })
})
~~~

由于要多次使用，不想写这么多代码，就会把这样的写法直接进行函数的封装，每次调用的时候直接返回一个Promise对象

~~~JavaScript
function fsRead(){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,{flag:'r',encoding:'utf-8'},(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
	})
}
~~~

使用的时候，就可以使用promise写法

~~~JavaScript
p1 = fsRead(path)	// 就可以得到Promise对象
p1.then((data)=>{
    console.log('输出数据:',data)
})
~~~

async  await 写法

~~~javascript
(async ()=>{
    let data = await fsRead(path);
})()
~~~

异步 async 函数调用之后也是一个promise对象

~~~javascript
// 写法一
async function test(){
    let data = await fsRead(path);
    return data;
}
let a = test()  // 异步函数调用后，也是一个promise对象
// 因为 a 是 promise 对象所以要使用 .then方法
a.then((data)=>{
    console.log(data);
})

// 写法二
(async ()=>{
    async function test(){
        let data = await fsRead(path);
        return data;
    }
    // 如果父函数是异步函数的话就可以使用 await 等待赋值，不用.then方法
    let b = await test();  // 异步函数调用后，也是一个promise对象
    console.log(b);
})()
~~~



