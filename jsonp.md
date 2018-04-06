# 问题小杂烩

## jsonp解决跨域


**实现思路:**
1. 前端创建回调函数，假设为callback()，函数中是对返回的数据的操作
2. 前端动态创建script 元素
3. 将script的src设为服务器路由地址，pathname中一个参数为funcName = callback
4. 后台服务器处理url，接收数据参数以及分解出"callback"这个函数名
5. 后台服务器处理完后返回"callback(params)"这个字符串，params是本来应该返回的json数据
6. 前端接到返回的数据后执行callback函数，完成跨域

例子:
```html
    <script type="text/javascript">
    //添加<script>标签的方法
    function addScriptTag(src){
        var script = document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.src = src;
        document.body.appendChild(script);
    }
    
    window.onload = function(){
        //搜索apple，将自定义的回调函数名result传入callback参数中
        addScriptTag("http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=apple&funcName=callback");
        
    }
    //自定义的回调函数result
    function callback(data) {
        //我们就简单的获取apple搜索结果的第一条记录中url数据
        alert(data);
    }
</script>
    
```
参考:
[jsonp实现跨域 ](www.cnblogs.com/September-sheep/p/7942465.html)
[深入浅出JSONP--解决ajax跨域问题](http://www.cnblogs.com/chopper/archive/2012/03/24/2403945.html)


# Promise

Promise 有自己的状态(state):

    Fulfilled： 成功

    Rejected：拒绝

    Pending： 进行中

  >  当new 一个Promise对象的时候， 我们能接收到两个方法参数： resolve和reject, 当调用 resolve方法的时候，会把Promise对象的状态从Pending变为Fulfilled（表示异步操作成功了），当调用 reject方法的时候， 会把Promise对象的状态从Pending变为Rejected，表示异步操作失败了， 而如果这两个函数没有调用，则Promise对象的状态一直是Pending（表示异步操作正在进行）


使用方法:
```js
   let promise = new Promise(function(resolve,reject){
        if(/*异步操作成功*/){
            resolve(value);
        } else {
            reject(err);
        }
    })
    //处理返回数据：

    promise.then(function(value){
        //成功
    },function(error){
        //失败
    })

   
   
```



- 不用promise写回调函数可能产生的bug
    - 函数调用时间不确定，可能异步可能同步
    - 调用时间过多
    - 调用时间太晚或者根本没有调用
    - 错误无法捕捉
    - 代码太冗余，难以理解

- 使用情况
    - “链式”:多个回调函数，上一个回调函数的返回值是下一个回调函数的参数。
    ```js
        //每一个then里面的异步操作可以返回一个值，传递给下一个异步操作
        promise.then(

        ).then(

        ).then(

        )
    ```

    - “门”:多个异步都得到结果后对所有结果进行综合处理。
    ```js
            Promise.all([
                promise1,
                promise2
                ])
            .then(([data1, data2]) =>  getDataAndDoSomething (data1,data2)
    ```
    > all方法接收一个大Promise数组，并返回一个新的大“Promise”，只有所有的Promise的状态都是Fulfilled，这个大Promise才能转化为成功，参数与数组中的promise相对应

    - “竞态”：一组异步操作，其中一个完成了， 这组异步操作便算是整体完成了。
    ```js
        var p = Promise.race([p1, p2, p3]);
        //只要p1、p2、p3之中有一个Promise率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
    ```
    
    参考: [【javascript】异步编年史，从“纯回调”到Promise](http://www.cnblogs.com/penghuwan/p/7451409.html)

## 同步，异步，阻塞，非阻塞的关系

### 类型

> 同步是两个对象之间的关系，而阻塞是一个对象的状态。

### 本质上并没有关系

- 同步与异步是关于指令执行顺序的。
- 阻塞非阻塞是关于线程与进程的。
- 两者本身并没有必然的关联系。

### 同步和异步


>同步和异步关注的是消息通讯机制。
所谓同步，就是在发出一个“调用”时，在没有得到结果之前，该“调用”就不返回。但是一旦调用返回，就得到返回值了。就是指“调用者”主动等待这个“调用的”结果。而异步则是相反，“调用”在发出之后，这个调用就直接返回了，所以没有返回结果。换句话说，当一个异步过程调用发出后，调用者不会立刻得到结果。而是在“调用”发出后，“被调用者”通过状态、通知来通知调用者，或通过回调函数处理这个调用。 


同步：执行一个操作之后，等待结果，然后才继续执行后续的操作。

异步：执行一个操作后，可以去执行其他的操作，然后等待通知再回来执行刚才没执行完的操作。

### 阻塞与非阻塞

>阻塞和非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态。
阻塞调用是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。非阻塞调用指在不能立刻得到结果之前，该调用不会阻塞当前线程。


阻塞：进程给CPU传达一个任务之后，一直等待CPU处理完成，然后才执行后面的操作。

非阻塞：进程给CPU传达任务后，继续处理后续的操作，隔断时间再来询问之前的操作是否完成。这样的过程其实也叫轮询。


参考:
[知乎问题](https://www.zhihu.com/question/19732473)
[同步，异步，阻塞，非阻塞的理解](http://xiaoh.me/2016/05/31/sync-async/)
[同步，异步，阻塞，非阻塞等关系轻松理解](https://github.com/calidion/calidion.github.io/issues/40)
