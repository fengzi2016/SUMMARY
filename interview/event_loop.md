# 事件循环

[参考链接](https://juejin.im/post/5b35cdfa51882574c020d685)
[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)


- 浏览器
    - 堆： 对象，引用数据类型地址，基础数据类型
    - 栈： 执行栈，函数调用，帧包括局部变量和参数
    - 消息队列： 异步，回调函数，调用 setTimeout 函数会在一个时间段过去后在队列中添加一个消息。
    > 清空微任务队列，抽取一个宏任务，再清空微任务队列，再抽取一个宏任务，直到微任务和宏任务队列都清空。
    - 宏任务：
        - script(整体代码)、
        - setTimeout、
        - setInterval、
        - I/O、
        - UI交互事件、
        - postMessage、
        - MessageChannel、
        - setImmediate（nodejs）
    - 微任务：
        - Promise.then、
        - MutaionObserver（已废弃）、
        - process.nextTick（node.js）

- nodejs
    - 6个阶段，每个阶段有一个执行队列：
        - timer：setTimeout，setInterval
        - I/O callbacks，tcp
        - 内部使用函数
        - poll：执行poll中的IO队列，检查定时器是否到期
        - check：setImmediate
        - close：连接关闭
   
**node js事件循环流程**

>
- 在加载 node 的时候，将 setTimeout、setInterval 的回调注册到 timerList，将 Promise.resolve 等 microTask 的回调注册到 microTasks，将 setImmediate 注册到 immediateQueue 中，将 process.nextTick 注册到 nextTickQueue 中。
- 当我们开始 event loop 的时候，首先进入 timers 阶段（我们只看跟我们上面说的相关的阶段），然后就判断 timerList 的时间是否到期了，如果到期了就执行，没有就下一个阶段（其实还有 nextTick，等下再说）。
- 接下来我们说 poll 阶段，在这个阶段，我们先计算需要在这个阶段阻塞轮询的时间（简单点就是下个 timer 的时间），然后等待监听的事件。
- 下个阶段是 check 阶段，对应的是 immediate，当有 immediateQueue 的时候就会跳过 poll 直接到 check 阶段执行 setImmediate 的回调。
- 每切换一个阶段都要清空nextTick 和 microTasks 。同步读取完后到异步timer阶段开始也是切换了阶段，也要先清空一次nextTick 和 microTasks 

 
- 注意：promise 的 参数函数内部代码是同步执行的。
- 延迟函数的第二个参数，是指最少延迟多少秒后放入到执行队列中去，而不是延迟多少秒后执行，所以不能保证时间到了就一定会被执行，还要等队列里的前面的函数被执行完才行。
- 延迟函数第二个为0也会至少延迟4毫米


**题目1：**
```js
    //1
setTimeout(()=>{
    console.log('A');
},0);
//2
var obj={
    func:function () {
        //3
        setTimeout(function () {
            console.log('B')
        },0);
        // 4
        return new Promise(function (resolve) {
            console.log('C');
            resolve();
        })
    }
};
//5
obj.func().then(function () {
    console.log('D')
});
//6
console.log('E');
```
**我的思路：** 

浏览器中：

- 同步代码读取下来，在宏任务队列中添加延迟函数1
- 读到执行语句5时，在宏任务队列中添加延迟函数3
- 执行promise的参数函数的内容：打印C
- 在微任务队列中添加函数5
- 执行函数6，打印E
- 清空微任务队列：D
- 执行一个宏任务：打印A
- 清空微任务队列
- 执行一个宏任务： 打印B

最终结果： CEDAB

nodejs中：

- 把延迟函数1放到timer队列中
- 读到执行语句5，将延迟函数2放到timer队列中
- 执行promise参数函数的代码：打印C
- 将回调函数5放到I/O队列中
- 执行语句6：打印E
- 一个event_loop结束，清空微任务队列：打印D
- 清空timer队列：打印A和B

最终结果：CEDAB

**题目2**

```js

// 1
setTimeout(() => {
  console.log('timeout 1');
}, 1);
// 2 
process.nextTick(() => {
  console.log('nextTick 1');
});
//3
fs.readFile('./index.js', (err, data) => {
  if(err) return;
  console.log('I/O callback');
  // 4
  process.nextTick(() => {
      console.log('nextTick 2');
  });
});
fs.readFile('./index.js', (err, data) => {
  if(err) return;
  console.log('I/O callback2');
  // 4
  process.nextTick(() => {
      console.log('nextTick 6');
  });
});
// 5
setImmediate(() => {
  console.log('immediate 1');
  // 6
  process.nextTick(() => {
      console.log('nextTick 3');
  });
});
// 7
setTimeout(() => {
  console.log('timeout 2');
  // 8
  process.nextTick(() => {
    console.log('nextTick 4');
  });
}, 100);
// 9
new Promise((resolve, reject) => {
  console.log('promise run');
  // 9
  process.nextTick(() => {
      console.log('nextTick 5');
  });
  // 10
  resolve('promise then');
  // 11
  setImmediate(() => {
      console.log('immediate 2');
  });
}).then(res => {
    // 12
  console.log(res);
});
console.log('tong')
```


最终答案：

promise run

tong

nextTick 1

nextTick 5

promise then

timeout 1

immediate 1

immediate 2

nextTick 3

I/O callback

nextTick 2

I/O callback2

nextTick 6

timeout 2

[思路](https://juejin.im/post/5bbee9d36fb9a05cff32388d)

题目3
```js
    console.log('script start');

setTimeout(function() {
  console.log('timeout1');
}, 10);

new Promise(resolve => {
    console.log('promise1');
    resolve();
    setTimeout(() => console.log('timeout2'), 10);
}).then(function() {
    console.log('then1')
})

console.log('script end');
```

- 浏览器中
    - scirpt start
    - promise1
    - script end
    - then 1
    - timeout1
    - timeout2
- nodejs 中
    - scirpt start
    - promise1
    - script end
    - then 1
    - timeout1
    - timeout2