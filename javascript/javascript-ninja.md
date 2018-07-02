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

## 6. generator and promise

### generator 的简单用法：

```js
    function* weaponGenerator() {
        yield "Katana";
        yield "Wakizashi";
        return 'return';//不起作用
    }
    //第一种输出写法
    for(let weapon of weaponGenerator()){
        //weapon 为 value
        assert(weapon !== undefined , weapon);
        //"Katana"
        //"Wakizashi"
    }
    //第二种输出写法
    const weaponIterator = weaponGenerator();
    const result1 = weaponIterator.next();
    // result1 = {value:"Katana",done:false}
    const result2 = weaponIterator.next();
    //result2 = {value:"Wakizashi",done:false}
    const result3 = weaponIterator.next();
    //result3 = {value:undefined,done:true}
    

```
- 调用generator函数后从第一个yield开始算，之后每次调用.next()就唤醒函数，碰到下一个yield就停止并且挂起，下次调用.next()时从挂起的地方开始。
- 当遇到return 和 没有代码执行后就会返回一个{value:undefined,done:true}对象，并且return后面的代码不起作用
- 如果yield表达式后面接的还是个generator()函数（假设为函数A），则下次.next()重新唤醒函数的时候就进入函数A中，在函数A中以同样的规则运行。
- generator函数的上下文和标准函数不同，当执行完一次yield后，此函数的上下文会从函数栈弹出，但是它弹出时的状态被开始调用函数而使用的承接的变量（即weaponIterator）记录着，所以下一次唤醒generator时，就直接根据记录找到上次停止的地方开始执行，函数栈最顶端放置的还是generator函数上下文，只是执行状态不同。

## 7. 面向对象的原型链

### new 函数名() 和  直接调用 函数名()的区别
例子：
```js
    function Ninja() {}
    Ninja.prototype.swingSword = function() {
        return true;
    }
    const ninja1 = Ninja();
    //此时ninja1 == undefined
    const ninja2 = new Ninja();
    //此时 ninja2 是一个实例化Ninja类生成的对象，并且有swingSword属性，并且可以调用这个属性
    //即: (ninja2 && ninja2.swingSword && ninja2.swingSword()) == true
```
### 属性重写

```js
    function Ninja() {
        this.swung = false;
        //[1]
        this.swingSword = function() {
            return !this.swung;
        }
    }
    //[2]
    Ninja.prototype.swingSword = function() {
        return this.swung;
    }
    const ninja = new Ninja();
```

**如果 Ninja()函数中有 swingSword属性，那么当用ninja2去拿swingSword属性时，拿的是函数内部[1]的，而不是原型的[2]。**

### ES5 用原型链实现继承的做法
```js
    function Person(){}
    Person.prototype.dance = function(){}

    function Ninja(){}
    Ninja.prototype = new Person();

    Object.defineProperty(Ninja.prototype,'constructor',{
        enumerable:false,
        value:Ninja,
        writable:true
    })
    //防止出现 ninja.constructor !== Ninja 却 === Person 的问题

    var ninja = new Ninja()

```



### 改变原型后实例的变化

实例跟踪的原型是 “ 实例化 和 某个原型改变 ” 之间，即 改变之前 的原型。

例子：
```js
    function Ninja() {
        this.swung = true;
    }
    const ninja1 = new Ninja();
    
    Ninja.prototype.swingSword = function() {
        return this.swung;
    }
    //此时 ninja1.swingSword()存在,可以被调用
    Ninja.prototype = {
        pierce:function() {
            return true;
        }
    }
   // 此时 ninja1.swingSword()存在，可以被调用
   const ninja2 = new Ninja();
   //此时ninja2的原型是{pierce:function() {return true;}},即改变后的原型

```

### ES6的class

包含生成和继承，原理还是 原型链，class只不过是个语法糖，只是内层将class转变成了原型链模式

```js
    class Person() {
        constructor(name) {
            this.name = name;
        }
        dance() {
            return true;
        }
    }
    class Ninja extends Person() {
        constructor(name,weapon) {
            super(name);
            this.weapon = weapon;
        } 
        wieldWeapon() {
            return true;
        }
    }
    var ninja = new Ninja('Yoshi','Wakizashi');
    //此时 ninja有 Ninja 类 和 Person类的所有方法和属性
    // ninja instanceof Person === true
    // ninja instanceof Ninja == true
```



## 9. collections - Array，Map，Set



### Array
- **特点**
    - 超过数组范围的访问将返回 **undefined**
    - 如果数组长度(array.length = x)被直接赋值扩大，没有赋值的元素将为 **undefined**
    - 如果数组长度被直接赋值减小，除了长度内的元素，其它元素将直接被删除

- **方法**：
    - push , pop - 尾部
    - unshift , shift - 头部
    - find,findIndex - 寻找
    - IndexOf - 是否存在于，下标为多少
    - splice(index,length,...insertArgs) -如果没有后面的参数就是删除,如果有则是删除后插入参数【替代】
    - map,filter,reduce
    - sort，回调函数返回-1，从小到大；返回1，从大到小

- **在对象Object里利用数组的方法**

    push的例子：

    ```js
        let obj = {
        length:0,
        add: function(value) {
            Array.prototype.push.call(this,value);
            //Array.prototype.push.apply(obj,[...args])
        }
    }
    obj.add('lijia');
    obj.add('xian');
    console.log(obj)
    //{ '0': 'lijia', '1':'xian',length: 2, add: [Function: add] }
    
    ```
### Map

注意：*函数和数组都是一种对象*

- 意义： **解决对象存储只能把key当作string的缺陷**
- 特点：**Map的key可以为任何对象**
- 方法：
    - size 长度
    - clear() 清空
    - has(key)， 判断Map中key是否存在，返回bool
    - set(key,value) 设置map键和键值
    - get(key) 获取key值
    - values() 返回所有的键值
    - keys() 返回所有的键
    - for(let item of map){},这将遍历整个map,每个item是一个只有2个元素的数组，item[0] 为key, item[1] 为value
- 例子
    ```js
        const ninjas = new Map();
        const ninja1 = {name:'C'};
        const ninaj2 = {name:'M'};
        ninjas.set(ninja1,{homeIsland:'Honshu'});
        ninjas.set(ninja2,{homeIsland:'Hokhaido'});
        console.log(ninjas.get(ninja1).homeIsland)
        //Honshu
    ```
### Set

- 特点：**Set中的所有值都是独一无二的**
- 意义：**用来去重，取交和并集比较容易**
- 方法：
    - has(value),判断value值是否存在，返回bool
    - add(value),从尾部添加value值，如果set集中已经存在，则不会产生任何影响
    - for...of 遍历
    - size 元素数量【长度】
    - delete(value) 删除
    - entries() 方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组
- 实例化：
```js
    //实例化时参数必须为数组
    const numbers = new Set(['1','2','3']);

```












