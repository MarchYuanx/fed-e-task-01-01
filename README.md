# 简答题

## 1、请说出下列最终的执行结果，并解释为什么

```
var a = []
for (var i=0;i<10;i++){
    a[i] = function(){
        console.log(i)
    };
}
a[6]();
```

```
最终打印 10，此处 i 为全局变量，当执行完 for 循环时，全局的 i 为 10，所以打印10。
```

## 2、请说出下列最终的执行结果，并解释为什么

```
var tmp = 123;

if(true){
    console.log(tmp); 
    let tmp;
}
```

```
Uncaught ReferenceError: Cannot access 'tmp' before initialization

{} 会产生块级作用域，此作用域内部用了let 声明变量，let不会造成变量提升，所以引用不到
```

## 3、结合ES6新语法用最简单的方式找出数组中的最小值？

```
var arr = [12,34,32,89,4]
```

```
const min = Math.min.apply(null, arr) 
使用Math.min 方法，并调用apply，把整个 arr 作为 apply 的第二个参数直接调用。
```


## 4、请详细说明 var，let，const 三种声明变量的方式之间的具体差别？
```
var 会造成变量提升，在全局或函数中用 var 声明变量相当于在其内部最顶上声明它
let、const 会创建块级作用域、不会有变量提升

var、let 可以先声明后赋值
const 必须在声明时就赋值

var、let 赋值之后可以修改
const 赋值之后无法修改，但对于复杂变量类型如对象，可以修改其属性，因为并没有修改其变量地址。


最佳实践：不用 var，主用const，配合let
```

## 5、请说出下列代码最终输出的结果，并解释为什么？

```
var a = 10
var obj = {
    a: 20,
    fn(){
        setTimeout(()=>{
            console.log(this.a)
        })
    }
}
obj.fn()
```
```
最终输出 20，this 的指向在运行时绑定，在此处，由 obj 调用，this 绑定在 obj上，this.a 就是 obj.a，所以为20。
```

## 6、简述 `Symbol` 类型的用途？

```
Symbol 的用途就是作为对象属性的标识符。可以使用 Symbol 创建私有属性，定义对象的迭代器、toString 方法等。
```

## 7、说说说明是浅拷贝、什么是深拷贝？


- 浅拷贝：仅仅是指向被复制的内存地址，如果原地址发生改变，那么浅拷贝出来的对象也会相应的改变。

- 深拷贝：在计算机中开辟一块新的内存地址用于存放复制的对象。

简单来说，浅拷贝只复制一层对象的属性，而深拷贝复制了所有层级。可以使用 JSON.parse(JSON.stringify(object))、或递归复制等实现深拷贝。



## 8、谈谈你是如何理解 JS 异步编程的，Event Loop 是做什么的，什么是宏任务，什么是微任务？


JavaScript 是一门单线程语言, 为了处理异步问题，JavaScript 使用了 Event Loop。

- 微任务：promise、mutationObersve、process.nextTick 等
- 宏任务：setTimeout、setInterval、setTmmediate(只兼容ie) 等

在 JS 代码运行中，如果运行中遇到了上述方法，如 promise 、setTimeout 等，并不会立即执行，而是先放入任务队列中，setTimeout 需要通过webAPI 创建定时器，定时结束之后才加入任务队列。

当代码执行完毕之后，开始轮询任务队列，微任务的优先级比宏任务高，所以先从微任务开始，按照先入先出的顺序依次执行，如果执行过程中产生了新的异步任务，则放入相应的任务队列，当微任务的队列为空时，开始执行宏队列的任务，如果在执行过程中产生了微任务，在当前宏任务结束后会先去执行微任务，直到微任务队列为空再执行宏任务，如此循环。

## 9、将下面异步代码使用 Promise 改进？

```
setTimeout(function(){
    var a = "hello";
    setTimeout(function(){
        var b = "lagou"
        setTimeout(function(){
            var c = "I ❤ U"
            console.log(a+b+c)
        },10)
    },10)
},10)
```

```
const sleep = (time)=>{
    var now = new Date();
    var exitTime = now.getTime() + time;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}


const promise = new Promise((resolve) => {
    var a = 'hello '
    sleep(10)
    resolve(a)
})

promise
    .then((result) => {
        var b = "lagou "
        sleep(10)
        return result + b
    })
    .then((result) => {
        var c = "I ❤ you"
        sleep(10)
        return result + c
    })
    .then(console.log)
```

## 10、请简述 TypeScript 与 JavaScript 之间的关系？

```
1. TypeScript 是 JavaScript 的一个超集。
2. TypeScript 在 JavaScript 的基础之上多了类型系统，与对ECMScript 的新特性的支持。
3. TypeScript 最终会编译为 JavaScript。
```

## 11、请谈谈你所认为的 Typescript 优缺点？

### 优点
- 引入静态类型，具有类型检测，避免了开发过程中的类型异常，提高代码效率，可靠程度等。
- 具有语法提示，IDE会根据当前的上下文，把能用的类、变量、方法和关键字都给你提示出来。
- 使用 TypeScript 工具来进行重构更变的容易、快捷。
### 缺点
- Typescript 引入了入一些新的概念，如接口、泛型、枚举等，增加了学习成本。
- 对于小型项目与短期项目，增加了开发成本。
