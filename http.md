









# http学习

我本来是打算学习koa，然后写点学习总结。但是当教程中介绍到app.listen(...)时，其中提到app.listen(3000)是http.createServer(app.callback()).listen(3000);的“语法糖”,就让我对http.createSever()方法产生兴趣。于是就开始了追根溯源之旅~

**httpcreateServer()**

这是node.js封装的一个http模块的方法，从字面意思看出来就是创建一个http服务器，与之相对应的还有个http.request(),即创建一个客户端。
一般的用法是这样：

    var http = require('http');

    http.createServer(function(req, res) {

    // 主页
    if (req.url == "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Welcome to the homepage!");
    }

    // About页面
    else if (req.url == "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Welcome to the about page!");
    }

    // 404错误
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 error! File not found.");
    }

    }).listen(8080, "localhost");


但这仍旧是node.js已经封装好的方法，而我想知道的如何用最原生的语言创建一个http服务器。而在阅读完很多不同语言的实现web服务器的文档后，发现比较核心的有这么2个专业名词。

**超文本传送协议HTTP**

http是个协议，有固定的格式，不同客户端的不同浏览器向万维网服务器请求万维网文档以及服务器把文档传送给浏览器的时候都要遵守它。

http有以下几个值得注意的特点:

1. 面向事务。要么所有的信息交换都完成，要么一次都不进行。
2. 无状态。每一次访问都是独立的，服务器不会记录任何访问之间的关系。
3. http的报文结构

    (1). 开始行。区分是请求报文还是响应报文

    (2). 首部行。说明浏览器，服务器或者报文主体的一些信息。

    (3). 实体主体。

4. HTTP/1.1协议使用了持续连接，即服务器发送响应后在一段时间内保持与客户端的连接，使得服务器可以继续在连接上发送后续的http请求报文和响应报文。

**Socket**

![socket](https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=17baf4c7d739b60059c307e588395e4f/d000baa1cd11728b45647b06cafcc3cec3fd2c4c.jpg)

socket本质是编程接口(API)，对TCP/IP的封装，TCP/IP也要提供可供程序员做网络开发所用的接口，这就是Socket编程接口；做个比喻就是：HTTP是轿车，提供了封装或者显示数据的具体形式；而Socket是发动机，提供了网络通信的能力。
其中的很多函数可以自己查阅资料。