
# 防抖和节流
## 防抖

每次触发事件小于wait则函数只调用一次。

## 节流

每次隔一定时间调用函数。


## 防抖的实现思路

如果函数是立即执行的，就立即调用，如果函数是延迟执行的，就缓存上下文和参数，放到延迟函数中去执行。一旦我开始一个定时器，只要我定时器还在，你每次点击我都重新计时。一旦你点累了，定时器时间到，定时器重置为 null，就可以再次点击了。

## 实现
```js
 // 设置一个later函数来创建延迟函数setTimeout，延迟函数内部清除timer，触发回调函数
 // 返回的函数控制timer以及上下文和args的更替
 function debounce(fn,wait,immediate) {
     let timer,context,args;
     const later = setTimeout(()=>{
         timer = null;
         if(!immediate){
             fn.apply(context,args);
             context = args = null;
         }
     },wait);
     return function(...params) {
         if(!timer){
             timer = later();
             if(immediate){
                 fn.apply(this,params);
             }else{
                 context = this;
                 args = params;
             }

         }else{
           clearTimeout(timer);
           timer = later(); 
         }
     }
 }
```

## 节流的实现思路


需要有2个额外参数，leading和trailing，分别设置开始和结束时是否要调用回调函数，两个不能共存。


自己实现思路：
- 函数内需要变量保存上一次调用时间，并且不断更新。
- 使用闭包，返回一个函数。
- 适当传递和置空上下文和参数
- 借用一个later函数作为延迟调用的回调函数，later函数里将timer置null，并且调用回调函数，将context和args置空。


自己实现：
```js
    function throttle(fn,wait) {
        let context,params;
        let timer = null;
        let previous = Date.now();
        let later = function() {
            timer = null;
            fn.apply(context,params);
            context = params = null;
        }
        return function(...args) {
            context = this;
            params = args;
            let cur = Date.now();
            let remaining = wait - (cur-previous);
            if(remaining<=0 || remaining > wait) {
                fn.apply(this,args);
            }
            previous = cur;
           if(!timer) timer = setTimeout(later,remaining);
        }
    }
```



```js
function throttle(fn,wait,options){
    if(!options) options = {};
    let timer,context,args,previous,result;
    timer = null;
    previous = 0;
    const later = function() {

        previous = options.leading ? 0 : Date.now()

        timer = null;
        fn.apply(context,args);
        if(!timer) context=args=null;
    }
    return function(...params) {
        let now = Date.now();
        args = params;
        context = this;
        if(!previous && options.leading == false) {previous = now;}
        let remaining = wait - (now - previous);
        if(remaining <= 0 || remaining > wait ) {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            result = fn.apply(context,args);
            if(!timer) context = args = null;
        }else if(!timer&&options.trailing !== false){
            timer = setTimeout(later,remaining);
        }

    }
    return result;
}
```





## 测试代码：
```js
function throttle(fn,wait) {
    let context,params;
    let timer = null;
    let previous = Date.now();
    let later = function() {
        timer = null;
        fn.apply(context,params);
        context = params = null;
    }
    return function(...args) {
        context = this;
        params = args;
        let cur = Date.now();
        let remaining = wait - (cur-previous);
        if(remaining<=0 || remaining > wait) {
            fn.apply(this,args);
        }
        previous = cur;
       if(!timer) timer = setTimeout(later,remaining);
    }
}
let previous = Date.now();
let test = () => {
    let ca = Date.now() - previous;
    console.log(ca);
    previous = Date.now();
}   
setInterval(throttle(test,100),10);
// 101
// 92
// 93
// 96
// 94
// 92
// 91
// 97
// 97
// 96
// 94
// 99
```