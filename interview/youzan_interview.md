# 有赞面试

## 没有回答好的题目：


1. JavaSript 作用域
2. MYSQL 索引
3. 修改this的方法
4. https 密钥
5. cookie and session 
6. vue的虚拟DOM树
7. koa和express 的区别，koa轻量级在哪里

## JS基础篇
- [you don't know javascript](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20%26%20going/ch1.md)

- [eloquent javascript](https://eloquentjavascript.net/)

- [javacript ninja](https://www.manning.com/books/secrets-of-the-javascript-ninja)


### 1. 作用域

- JavaScirpt 有 **全局作用域，函数作用域，eval作用域**，**没有块作用域**，

- 函数作用域：一个函数中的任何位置定义的变量在该函数中的任何地方都是可见的。

- 块作用域：任何一对花括号中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。

- 如何让JS模拟出块级作用域：

    把语句块放到一个闭包之中，然后调用这个函数，当函数调用完毕，变量自动销毁，相当于给这个闭包加了一个函数作用域，因此，我们在块外便无法访问了。
    例子：
```js
    
    function grid(){
        (function() {
           var i = 1;
        })();

        console.log(i);
        //ReferenceError: i is not defined
    }
    grid();
    //弹出i未定义的错误
```
-  JavaScript 采用的是词法作用域即静态作用域，函数的作用域在函数定义的时候就决定了。而动态作用域的意思是，函数作用域在执行的时候才决定。


### 2. https 密钥

#### SSL过程 --- by 阮一峰


- 客户端发出加密通信的请求。发信息：
    - 支持的协议版本，比如TLS 1.0版。
    - 一个客户端生成的随机数，稍后用于生成"对话密钥"。
    - 支持的加密方法，比如RSA公钥加密。
    - 支持的压缩方法。

- 服务器回应，发送信息：
    - 确认使用的加密通信协议版本，比如TLS 1.0版本。如果浏览器与服务器支持的版本不一致，服务器关闭加密通信。
    -  一个服务器生成的随机数，稍后用于生成"对话密钥"。
    - 确认使用的加密方法，比如RSA公钥加密。
    - 服务器证书（数字证书，里面包含公钥）。
-  客户端回应，发送信息：
    - 一个随机数。该随机数用服务器公钥加密，防止被窃听。

    -  编码改变通知，表示随后的信息都将用双方商定的加密方法和密钥发送。

    -  客户端握手结束通知，表示客户端的握手阶段已经结束。这一项同时也是前面发送的所有内容的hash值，用来供服务器校验。
- 服务器的最后回应
服务器收到客户端的第三个随机数pre-master key之后，计算生成本次会话所用的"会话密钥"，发送信息：
    - 编码改变通知，表示随后的信息都将用双方商定的加密方法和密钥发送。

    - 服务器握手结束通知，表示服务器的握手阶段已经结束。这一项同时也是前面发送的所有内容的hash值，用来供客户端校验。



## 3. cookie and session

### 1) 两者联系

    cookie 虽然很方便，但是使用 cookie 有一个很大的弊端，cookie 中的所有数据在客户端就可以被修改，数据非常容易被伪造，那么一些重要的数据就不能存放在 cookie 中了，而且如果 cookie 中数据字段太多会影响传输效率。为了解决这些问题，就产生了 session，session 中的数据是保留在服务器端的。

    session 的运作通过一个 session_id 来进行。session_id 通常是存放在客户端的 cookie 中，比如在 express 中，默认是 connect.sid 这个字段，当请求到来时，服务端检查 cookie 中保存的 session_id 并通过这个 session_id 与服务器端的 session data 关联起来，进行数据的保存和修改。

    这意思就是说，当你浏览一个网页时，服务端随机产生一个 1024 比特长的字符串，然后存在你 cookie 中的 connect.sid字段中。当你下次访问时，cookie 会带有这个字符串，然后浏览器就知道你是上次访问过的某某某，然后从服务器的存储中取出上次记录在你身上的数据。由于字符串是随机产生的，而且位数足够多，所以也不担心有人能够伪造。伪造成功的概率比坐在家里编程时被邻居家的狗突然闯入并咬死的几率还低。

    session 可以存放在 1）内存、2）cookie本身、3）redis 或 memcached 等缓存中，或者4）数据库中。线上来说，缓存的方案比较常见，存数据库的话，查询效率相比前三者都太低，不推荐；cookie session 有安全性问题。
### 2) 两者区别
- Cookie 在客户端（浏览器），Session 在服务器端。 
- Cookie的安全性一般，他人可通过分析存放在本地的Cookie并进行Cookie欺骗。在安全性第一的前提下，选择Session更优。重要交互信息比如权限等就要放在Session中，一般的信息记录放Cookie就好了。 
- 单个Cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个Cookie。 
- Session 可以放在 文件、数据库或内存中，比如在使用Node时将Session保存在redis中。由于一定时间内它是保存在服务器上的，当访问增多时，会较大地占用服务器的性能。考虑到减轻服务器性能方面，应当适时使用Cookie。 
- Session 的运行依赖Session ID，而 Session ID 是存在 Cookie 中的，也就是说，如果浏览器禁用了 Cookie，Session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 Session ID）。 
- 用户验证这种场合一般会用 Session。因此，维持一个会话的核心就是客户端的唯一标识，即Session ID。

