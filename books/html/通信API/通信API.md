# 通信API
- 跨文档消息传输
  - 通过对window对象的message事件监听
  - 通过访问message事件的origin属性，获取消息的发送源
  - 通过访问message事件的data属性取得消息内容
  - 用postMessage发送消息
  - 访问message事件的source属性可以获得发送源的窗口对象
  ```js
    // 监听
    window.addEventListener("message",()=>{},false);
    otherWindow.postMessage(message, targetOrigin);
    var iframe = window.frames[0];
    iframe.postMessage("你好",targetOrigin);
  ```
- 通道通信
通道通信机制提供了一种在多个源之间进行通信的方法，这些源之间通过端口（port）进行通信，从一个端口发出的数据将被另一个端口接收。目前只有谷歌支持


