# Web 套接字
## 1. websokect安全方案
它允许客户端代码在客户端和支持WebSocket协议的服务器端创建双向的套接字类型的连接。
## 2.构建
WebSocket构建函数的参数是一个URL，该URL使用ws://协议，该url指定要连接的主机，还有可能指定的端口，路径或者资源
```js
  var socket = new WebSocket('ws://ws.example.com:1234/resource');
```
## 3.注册
创建了套接字之后，通常需要在上面注册一个事件处理程序：
```js
socket.onopen = function(e){/*套接字已经连接*/}
socket.onclose = function(e){/*套接字已经关闭*/}
socket.onerror = function(e){/*出错*/}
socket.onmessage = function(e){var message = e.data/*服务器发送一条信息*/}
```
## 4.发送数据
客户端发送数据给服务器
```js
socket.send('str');
```

### 4.1 支持
  - 消息类型
    - 文本消息，并且必须以UTF-8编码
    - 二进制信息

### 4.2 模式
- 双向
- 不是采用请求和响应的格式
- 定义子协议，通过协商机制确定子协议

##  5.[例子🔗](./websocket.js)

