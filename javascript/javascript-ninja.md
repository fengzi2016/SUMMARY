# javascript ninja学习总结
## 第一章  JavaScript is everywhere
### 1. javascript 特点
- function are first-class objects 函数对象
- function closures 闭包
- scopes 作用域
- prototype-based object orientation 原型链
- Generators 继承
- Promises 异步
- Proxies 处理器
- Advanced array methods 高级数组方法
- Maps map对象
- Regular expressions 正则表达式
- Modules 模块化
### 2.调试方法
- 判断变量是否达到预期 assert(condition,message) 

    **condition为假,message输出**

    栗子：
    ```js
        assert(a===1,"Disaster! a is not 1!")
    ```
- 获取代码段运行时间

    栗子：
    ```js
        console.time("My operation");
        for(var n = 0; n < maxCount; n++) {
            /*perform the operation to be measured*/
        }
        console.timeEnd("My operation");
    ```
## 第二章 Building the page at runtime
###  网页生成流程
 1. enters url
 2. generates a request and sends it to servers
 3. **server**: performs actions or gets a resource; sends response to client;
 4. 接收HTML和CSS,JavaScript等文件，开始page build
    - Building the DOM from HTML
    - Executing JavaScript code
    - 从头到尾逐句执行，HTML渲染可以被script标签或者css语句打断，而先去执行标签里的，执行完之后再渲染
 5. 创建和持续监控 event queue, queue里有事件则陆续执行，没有事件则不断检测是否有新的事件。
    - event包括以下几种
        - Broswer events , like "onload()"
        - Network events , like "ajax,server-side"
        - User events , like "click"
        - Time events , like "timeout, interval"
    - 添加监听事件有2种方法：
        - el.addEventListener("click",callback)
        - el.onclick = function(){}
  6. 关闭网页，停止监听，释放内存
## 第三章 First-class functions for novice: definitions and arguments

### 1. 函数的各种形态
 -  函数可以被赋予给一个变量
    
    ```js
        var ninjaFunction = function(){}
    ```
- 函数可以成为数组元素

    ```js
        ninjaArray.push(function(){})
    ```
- 函数可以成为对象的一个属性
    ```js
        ninja.data = function(){}
    ```
- 函数可以成为另一个函数的参数以及返回值
    ```js
        function call(ninjaFunction) {
            ninjaFunction()
            return function(){}
        }
    ```
- 函数可以被当作对象一样被赋予属性
    ```js
        let ninjaFunction = function(){}
        ninjaFunction.word = "ninja is cool"
    ```
### 2. 回调函数的实现原理
回调函数实现原理就是调用一个函数A，函数A完成某些操作之后返回了一个函数B的执行体，所以又去执行函数B ， 函数B执行完之后再把返回值给函数A ， 函数A再返回函数B传过来的返回值。

栗子：

```js
    let text = 'call back demo';
    report("before definning function");
    function useless(ninjaCallback) {
        report("In useless function");
        return ninjaCallback();
    }
    function getText() {
        report("In getText function");
        return text;
    }
    report("before making all the calls");
    assert(useless(getText) === text,"The useless function works! "+text);
    report("After the calls have been made");

 
```

### 3. 创建一个会记忆的函数
判断一个数是否为素数：
```js
    function isPrime(value) {
        //给函数添加了一个属性 answers : {} ，用来存储之前测试过的值
        if(!isPrime.answers) {
            isPrime.answers = {};
        }
        if(isPrime.answers[value] !== undefined) {
            return isPrime.answers[value];
        }
        let prime = value !== 1;
        for(let i = 2; i < value ; i++) {
            if(value % i == 0) {
                prime = false;
                break;
            }
         }
         return isPrime.answers[value] =  primse; //进行存储
    }
``` 
### 4. 定义函数的几种方式
1. Function declarations
   ```js
        function myFun(){}
   ```
2. Function expressions
    ```js
        let myFun = function() {}

        Myfunc(function(){
            return function(){};
        })

        (function namedFunctionExpresstion() {

        })();
        +function(){}()
        -function(){}()
        !function(){}()
        ~function(){}()
    ```
3. Arrow functions
    ```js
        myArg => myArg * 2
    ```
4. function constructors
    ```js
        new Function('a','b','return a + b');
    ```
5. generator functions
    ```js
        function* myGen(){}
    ```
### 5.函数参数
 
 1. 根据函数参数所在不同地方，和不同作用，它们有不同的英文解释，如
 ```js
    function skulk(ninja){
        return performAction(ninja,"skulking")
    }
   // (ninja)，这里的ninja 叫做 function parameters
   // return performAction(ninja,"skulking")，这里的ninja和"skulking"叫做function arguments
 ```
 2. **rest parameters**

可以用rest parameters来代表剩余的所有参数，并且rest parameters只能放在参数里最后一个位置。

```js
  function multiMax(first,...restParameters) {

  }
  //restParameters是一个数组
```
3. **默认参数**
```js
    function performAction(ninja, action = "skulking")
```
## 第四章 Functions for the journeyman:understanding function invocation

**当创建或者调用函数时，有2个固定对象类型的参数被传入，arguments和this。**

## arguments
1. **arguments.length** 返回了一个函数的参数个数，即使函数定义时()中没有parameters，只要调用的时候传入了parameters，arguments就不等于0。
如:
```js
      function whatever() {
          return arguments.length;
      }
      whatever(1,2,3)
      //返回3
```
2. 在普通模式下，arguments[i]和如上面例子中whatever(a,b,c)相同下标的值相互影响和改变。
```js
      function whatever(a,b,c) {
        arguments[0] = 4;
        return a == 4;
      }
      whatever(1,2,3)
      //返回true
```
3. 在严格模式下，arguments[i]与parameters中的值不会同步改变
```js
    'use strict';
    function whatever(a,b,c) {
        arguments[0] = 4;
        return a == 4;
    }
    whatever(1,2,3)
    //返回false,a == 1 

```
## this
1. 调用一个函数的几种方法
- As a function --- skulk()
- As a method --- ninja.skulk()
- As a constructor --- new Ninja()
- use apply or call methods --- skulk.call(ninja) or skulk.apply(ninja)
2. 一般情况下当不同调用时 **this** 的指向
- As a function,this == 严格模式：undefined,普通模式：window.
- As a method of a object, this == the object.
- As a constructor , this == the newly constructed object
- with call and apply , this == the first parameter 
3. 几种特殊情况，箭头函数和bind方法
- 箭头函数没有自己的this ，所以如果它是在函数里被创建的，它的this指的是这个函数，但如果它在对象里被创建的，并且被赋值给对象的一个属性，则它的this 在普通模式下是window, 在严格模式下是undefined.
- 用bind方法可以创建一个新的有一样内容的函数，并且this一定是这个新函数。

## 与第三章的rest联系
```js
    function test1() {
        let sum = arguments.reduce((accumulator,value) => {
            accumulator += value;
            return accumulator;
        },0);
        return sum;
    }
    //等同于
    function test2(...rest) {
    let sum = rest.reduce((accumulator,value)=>{
        accumulator += value;
        return accumulator;
    },0)
    return sum;
    }

```