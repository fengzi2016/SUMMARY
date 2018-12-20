# 今日头条笔试总结

## 难题 

1. date处理时间戳
2. class实现eventEmit的on off once trigger
3. 正则表达式实现匹配字符串
4. bind,this
5. 原码补码反码
6. 保证ajax数据在用户触发数据显示之前显示
7. arrayBuffer
8. Bem
9. 手写Promise
10. 跨域

### 1. date时间戳
1. 日期转化为时间戳
```js
    let time = '2014-04-23 18:55:49:123'
    let date  = new Date(time);
    console.log(Date.parse(time))
    console.log(Date.parse(date))
    console.log(date.valueOf())
    console.log(date.getTime())
```
特点：

1. 必须将日期字符串转化成Date实例才能调用valueOf()，getTime()方法
2. Date.parse()方法可以传字符串也可以传Date实例



2. 时间戳转化为日期

```js
  new Date('10000000000')
```
### 2. class 实现 event

```js
    class EventEmit {
        constructor() {
            this._events = {};
        }
        on(event,callback) {
             // 获取之前存储的其它回调函数，没有则为空数组
            let callbacks = this._events[event] || [];
            // 将新回调函数加入函数数组
            callbacks.push(callback);
            // 将数组作为类的私有变量_events的属性名为event的属性值
            this._events[event] = callbacks;
            // 将类返回
            return this;
        }
        off(event,callback) {
            let callbacks = this._events[event] || [];
            callbacks = callbacks && callbacks.filter((fn)=> fn!=callback);
            this._events[event] = callbacks;
            return this;
        }
        trigger(...args) {
            let event = args[0];
              //取 args 这个数组中的从下标1到最后的元素赋给数组[]
            let callbacks = this._events[event];
            let params = [].slice.call(args,1);
            callbacks.forEach(fn => fn.apply(this,params));
            return this;
        }
        once(event,callback) {
            let wrapFunc = (...args) => {
                callback.apply(this,args);
                this.off(event,wrapFunc);
            }
            this.on(event,wrapFunc);
            return this;
        }
    }

```
### 3.学习正则表达式


刷题练习


```js
 const where = () => {
    //获取调用函数名字
    //不严格模式下可以 arguments.caller.name;
   let reg = /\s+at\s(\S+)\s\(/g;
   let str = new Error().stack.toString()
   let res = reg.exec(str) && reg.exec(str)
    return res[0]&&res[1];
 }
 var myRe = /d(b+)d/g;
 var str = "cdbbdbsbz,cdbbdbsbz";
 var myArray = myRe.exec(str);
 var b = myRe.test(str);
 var m = str.match(myRe);
 var s = str.search(myRe);
 var r = str.replace(myRe,'$1')
 var sp = str.split(myRe);
 console.log('a:'+myArray[0])
 console.log('b:'+b);
 console.log('m:'+m);
 console.log('s:'+s);
 console.log('r:'+r);
 console.log('sp:'+sp)
 //分解路由
 const parseQueryString = function (query) {
    
let myRe = /\?\w*(=\w*)*((&\w+){1}(=\w(?!#)*)*)*/g;
     let myRe = /\?\S*(=\w*)*((&\w+){1}(=\w(?!#)*)*)*/g;
    let result = {};
    let r = myRe.exec(query);
    if(r!==null){
        let myArr =r[0] ;
        let qu = myArr.split('?')[1];
       qu = qu.split('&');
         qu.map((item)=>{
            let arr = item.split('=');
            if(arr.length==2)
        result[arr[0]] = arr[1] || '';
           else result[arr[0]] = null;
        })
   }
    return result;
    
}
console.log(parseQueryString('https://scriptoj.com/problems/?offset=&limit=100#name=jerry '));
console.log(parseQueryString('https://scriptoj.com/problems/#?offset=10&limit=100'))
```

### 4. 源码 反码 补码
1. 源码 

    8位二进制表表示的数字

    如 2 的源码为 0000 0010，第一位为符号位，0为正号，1为负号

2. 反码

    源码除了符号位按位取反再加+1

    如 2 的源码 0000 0010

    除了符号位按位取反: 0111 1101

    再加一: 0111 1110


**如果+1后超出了8位，舍去第九位，再在末尾加1**

如 101000001==01000010  

3. 补码

    反码+1

    如 2 的反码 0111 1110 

    补码 0111 1111


### 5. bind this

bind: fn.bind(obj,arguments)生成一个新的函数，其内容是fn的拷贝，并且它的content上下文是obj,所以它指定的this 是obj

### 6. Event Loop

**nodejs**
1. timers (setTimeout,setInterval)
2. I/O callbacks (上一轮循环中有少数的I/Ocallback会被延迟到这一轮的这一阶段执行)
3. idle,prepare (内部使用))
4. pool (最重要的阶段，执行I/O callback，在适当条件下会阻塞在这个阶段)
5. check （setImmidate）
6. close callbacks （执行close事件的callback，例如socket.on("close",func)）


**浏览器**

- 微任务：promise，nextTick，IO回调
- 宏任务：setImmidate , setTimeout, setInterval

1. 先执行当前栈，执行完主执行线程中的任务
2. 取出MicroTask微任务队列任务执行直到清空
3. 取出Macrotask宏任务中一个任务执行
4. 检查Microtask微任务中有没有任务，如果有任务，执行直到空
5. 循环3和4.

#### 注意

- 如果有IO操作，则进入pool阶段（可能会阻塞），之后是process.nextTick(),setImmidate, timer...如果IO操作之前有timer，则应该先检测timer阶段是是否有callback时间到了。

例子：
```js
//读取或写入文件操作
var fs = require('fs');
function someAsyncOperation (callback) {
  // 花费2毫秒
  fs.readFile(__dirname + '/' + __filename, callback);
}

```
- process.nextTick() ，阶段转化的时候调用，属于microtask。process.nextTick()方法将 callback 添加到next tick 队列，并且nextTick优先级比promise等microtask高，所以一般所有同步代码执行完后，就是nextTick里的代码
- 同一个上下文下，MicroTask微任务会比MacroTask宏任务先运行。





