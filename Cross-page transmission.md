# 跨页面传输
## 本次小组采用的是利用url参数跨页面传输数据，核心代码如下：
**点击电影图片触发函数，给url添加参数**
```
function myonclickhrf(myid) {
    let myname = $('.ysj-login-name').html();
    if(myname){
        window.location.href = "/moviecontain.html?id="+myid+"&name="+myname
    }else {
        window.location.href = "/moviecontain.html?id="+myid+"&name="
    }
}
```
其中参数**myid**可以是后台传来的用户ID，也可以是从html中获取的用户ID，视情况而定。

***

**将url参数取出，如果参数存在则利用参数显示用户名，如果不存在则显示固定内容**
```
let myurl = window.location.href.split("?id=");
myurl = [myurl[1].split('&name=')[1], myurl[1].split('&name=')[0]];
if (myurl[0]) {
    $('.ysjLogin').html("你好" + myurl[0]);
} else {
    bootbox.alert("您未登录，请去主页进行登录注册！");
    $('.ysjLogin').html("你好,游客！");
}
```
### 从而实现通过url参数判断用户登陆状态
***
## 知识延伸
### 其他跨页面消息传输方法
 1. **用窗口对象的message事件监控**
 ```
 接收从其它窗口发来的消息

  window.addEventListener('message',functio(){},false);
```
```
向其它窗口发送消息

otherwindow.postMessage(message,targetOrigin);

参数message为所发送的消息，可以为静态内容也可以为javascript对象

参数targetOrigin为接收消息的对象窗口的url地址
```
otherWindow为要发送窗口对象的引用,可以通过window.open返回该对象,或通过对window.frames数组制定序号或名字的方式来返回单个frame所属的窗口对象.

## 栗子(可能有错，待定)
在本例中，我们需要接收**index.html**中导航栏里用户名，并将其发送到**moviecontain.html**，如果用户返回**index.html**界面，我们还需要做一个逆向发送的操作。假设装着用户名的div的ID为**username**,监听的端口为8081
***
**index.html中JS代码**
```
window.addEventListener('message',function(ev){
          $('#username').innerHTML=ev.data;
        },false);
         function post(){
            let iframe=window.frames['username'];
            iframe.postMessage($('#username').html());
        }

```
**index.html中html代码**
```
<iframe src="http://127.0.0.1:8081/moviecontain.html" name='username'>
        <div id='username'></div>
 </iframe>
```
**moviecontain.html**中JS代码
```
window.addEventListener('message',function(ev){
        $('#username').innerHTML=ev.data;
        ev.source.postMessage(ev.data,ev.origin);
    },false);
```
**moviecontain.html**中html代码
```
<iframe src="http://127.0.0.1:8081/index.html" name='username'>
        <div id='username'></div>
 </iframe>
```