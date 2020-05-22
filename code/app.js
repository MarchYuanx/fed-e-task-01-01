//1

var a = []
for (var i=0;i<10;i++){
    a[i] = function(){
        console.log(i)
    };
}

// a[6](); // 10，i 为全局变量，当执行完for循环时，全局的i为10，所以打印10

//2 
var tmp = 123;

if(true){
    console.log(tmp); // Uncaught ReferenceError: Cannot access 'tmp' before initialization
    let tmp // {} 会产生块级作用域，此作用域内部用了let 声明变量，let不会造成变量提升，所以引用不到，error
}

//3

var arr= [12,34,32,89,4]

const min = Math.min.apply(arr,arr) 


// 5
var a = 10
var obj = {
    a: 20,
    fn(){
        setTimeout(()=>{
            console.log(this.a)
        })
    }
}

obj.fn() // 20,this的指向是在运行时确定的，此处由obj调用，this指向obj，所以this.a=obj.a


//9

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


const promise = new Promise((resolve) => {
    var a = 'hello '
    resolve(a)
})

promise
    .then((result) => {
        var b = "lagou "
        return result + b
    })
    .then((result) => {
        var c = "I ❤ you"
        return result + c
    })
    .then(console.log)
