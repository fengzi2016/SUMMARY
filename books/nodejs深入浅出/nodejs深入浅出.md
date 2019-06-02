# nodejs深入浅出笔记
## 一. node的形成
1. 基于V8的Javascript引擎
2. 单线程
 - node 保持了Javascript在浏览器的单线程的特点，而且在node中，javascript与其它线程是无法共享状态。
 - 单线程最大的好处是不用像多线程编程那样处处在意状态的同步问题，这里没有死锁的存在，也没有线程上下文交换带来的开销。
 - 单线程的缺点，无法利用多核CPU，错误会引起整个应用的退出，应用的健壮性值得考验。大量计算占用CPU导致无法继续调用异步I/O
3. 单线程的特点使得需要将大型运算任务进行分解，不长时间阻塞I/O的调用。
4. nodejs的运用场景
  - 前后端编程语言环境都用js
  - Nodejs应用与实时运用，利用socket.io实现实时通知
  - 并行I/O 利用分布式环境
  - 并行I/O有效利用稳定接口提升Web渲染能力
  - 云计算平台提供Node支持
  - 游戏开发领域，pomelo实时框架
  - 工具类应用
5. nodejs遵循commonjs规范，这些规范涵盖了模块，二进制，Buffer，字符集编码，I/O流，进程环境，文件系统，套接字，单元测试，Web服务器网关接口，包管理。
6. nodejs的模块实现包括：路径分析，文件定位，编译执行。
7. 模块分类，Node提供的叫核心模块部分，这部分在node源代码的编译过程中，编译进了二进制执行文件，在node进程启动时，部分核心模块就被直接加载进入了内存，其加载速度最快。文件模块则是在运行时动态加载。
8. 不同于浏览器的缓存文件，node缓存的是编译和执行之后的对象
9. nodejs中的文件模块对象
```js
  function Module(id, parent){
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if(parent && parent.children) {
      parent.children.push(this);
    }
    this.filename = null;
    this.loaded = false;
    this.children = [];
  }
```
10. 根据文件的拓展名，载入文件的方法不同
  - .js,通过fs模块同步读取文件后编译执行
  - .node，这是用C/C++编写的拓展文件，通过dlopen()方法加载最后编译生成的文件。
  - .json，通过fs模块同步读取文件之后，用JSON.parse解析返回结果
  - 其余拓展名文件，它们都被当中.js文件载入
11. 每一次编译成功的模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二次引入的性能。
12. 不同平台下，模块的加载生成的文件不同。比如在Unix下，用g++/gcc编译器将源码编译为.so文件，再根据.so文件生成.node文件，再加载.so，并且调用dlopen方法，最后导出给Javascript。而在windows下是用VC++编译源码，生成.dll文件。

## 二. 异步I/O
1. 为了弥补单线程无法利用多核CPU的缺点，Node提供了类似前端浏览器中Web Workers的子进程，该子进程可以通过工作进程高效地利用CPU和I/O。
2. 操作系统对计算机进行了抽象，将所有输入输出设备抽象为文件，内核在进行文件I/O操作时，通过文件描述符进行管理，而文件描述符类似于应用程序与系统内核之间的凭证。
3. 轮询。由于完整的I/O并没有完成，立即返回的并不是业务层期望的数据，而仅仅是当前调用的状态。为了获取完整的数据，应用程序需要重复调用I/O操作来确认是否完成。
4. 现实中的异步I/O，通过让部分线程进行阻塞I/O或者非阻塞I/O加轮询技术来完成数据获取，让一个线程进行计算处理，通过线程之间的通信将I/O得到的数据进行传递。
5. nodejs的单线程只是javascript执行是单线程，在node中无论是unix还是windows平台，内部完成I/O任务的另有线程池。
6. 每次调用process.nextTick()方法，只会将回调函数放入队列中，在下一轮Tick时取出执行，定时器中采用红黑树的操作时间复杂度为O(ln(n))，nextTick()的复杂度为O(1),相比之下，process.nextTick()更高效。
7. 在具体实现上，process.nextTick()的回调函数保存在一个数组中，setImmediate()的结果则是保存在链表中。在行为上，process.nextTick()在每轮循环中会将数组中的回调函数全部执行完，而setImmediate()在每轮循环中执行链表的一个回调函数。
## 三. 异步编程
1. try/catch/final无法捕获到异步I/O异常。
 - err first 写法。将异常作为回调函数的第一个实参传回，如果为空值，则表明异步调用没有异常抛出。
 ```js
  async(function(err,results){})
  //实现原理
  var async = function(callback){
    process.nextTick(function(){
      var results = something;
      if(error){
        return callback(error);
      }
      callback(null, results);
    })
  }
 ```
2. 一种错误的写法.
```js
  // 错误原因，如果真的有错误，回调函数会调用2遍
  try {
    req.body = JSON.parse(buf, options.reviver);
    callback();
  } catch(err) {
    err.body = buf;
    err.status = 400;
    callback(err);
  }
  // 正确写法
  try {
    req.body = JSON.parse(buf, options.reviver);
  } catch(err) {
    err.body = buf;
    err.status = 400;
    return callback(err);
  }
  callback();
```
3. 异步编程的解决方法
  - 事件发布/订阅模式
  - Promise/Deferred模式
  - 流程控制库
4. promise的实现
```js
  var Promise = function() {
    EventEmitter.call(this);
  };
  util.inherits(Promise, EventEmitter);
  Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    if(typeof fulfilledHandler === 'function'){
      this.once('success',fulfilledHandler);
    }
    if(typeof errorHandler === 'function'){
      this.once('error', errorHandler);
    }
    if(typeof progressHandler === 'function'){
      this.on('progress', progressHandler);
    }
    return this;
  }
  var Deferred = function() {
    this.state = 'unfulfilled';
    this.promise = new Promise();
  };
  Deffered.prototype.resolve = function(obj) {
    var promise = this.promise;
    var handler;
    while((handler = promise.queue.shift())){
      if(handler && handler.fulfilled){
        var ret = handler.fulfilled(obj);
        if(ret && ret.isPromise){
          ret.queue = promise.queue;
          this.promise = ret;
          return;
        }
      }
    }
    this.state = 'fulfilled';
    this.promise.emit('success',obj);
  };
  Defferred.prototype.reject = function(err){
    this.state = 'failed';
    this.promise.emit('error',err);
  }
  Deferred.prototype.progress = function(data){
    this.promise.emit('progress',data);
  }
  var promisify = function(res) {
    var deferred = new Deferred();
    var result = '';
    result.on('data',function(chunk){
      result += chunk;
      deferred.progress(chunk);
    });
    result.on('err',function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }
  promisify(res).then(function(){},function(err){},function(chunk){})
  Deferred.prototype.all = function(promises){
    var count = promises.length;
    var that = this;
    var results = [];
    promises.forEach((promise,i) => {
      promise.then((data) => {
        count --;
        results[i] = data;
        if(count === 0) this.resolve(results);
      },(err) => {
        this.reject(results);
      });
    });
    return this.promise;
  }
  // 链氏实现
  var Deferred = function() {
    this.promise = new Promise();
  }
  // 完成态
  Deferred.prototype.resolve = function(obj) {
    var promise = this.promise;
    var handler;
    while((handler = promise.queue.shift())){
      if(handler && handler.fulfilled){
        var ret = handler.fulfilled(obj);
        if(ret && ret.isPromise){
          ret.queue = promise.queue;
          this.promise = ret;
          return;
        }
      }
    }
  }
  // 失败态
  Deferred.prototype.reject = function(err){
    var promise = this.promise;
    var handler;
    while((handler = promise.queue.shift())){
      if(handler && handler.error){
        var ret = handler.error(err);
        if(ret && ret.isPromise){
          ret.queue = promise.queue;
          this.promise = ret;
          return;
        }
      }
    }
  }
  // 生成回调函数
  Deferred.prototype.callback = function() {
    
  }

```
promise的原理是订阅者模式。
promise的实现
```js
```