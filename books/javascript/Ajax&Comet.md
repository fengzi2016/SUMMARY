# Ajax and Comet
javascript 高级程序设计21章
## Ajax
- 并不是所有的浏览器都兼容XHLHttpRequest，IE7以下就不能
1. 兼容所有浏览器的创建xhr的代码
  ```js
    function createXHR(){
      if(typeof XMLHttpRequest != "undefined") {
        return new XHLHttpRequest();
      } else if(typeof ActiveXObject != "undefined"){
        if(typeof arguments.callee.activeXString != "string"){
          var versions = [
            "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp"
          ],
          i, len;
          for(i = 0, len = version.length; i < len; i++){
            try {
              new ActiveXObject(versions[i]);
              arguments.callee.activeXString = versions[i];
            } catch(ex){
              // 跳过
            }
          }
          return new ActiveXObject(arguments.callee.activeXString);
        } 
    }else {
          throw new Error("No XHR object available");
    }
  }
      
  ```
  2. xhr 
  ```js
   let xhr = {
     responseXML: "如果响应内容是text/xml,application/xml，这个属性将保存包含着响应数据的XML DOM文档",
     responseText: "作为响应主题被返回的文本",
     status: "状态码",
     statusText: "状态码信息",
     readyState: {
       0: "未初始化,未open",
       1: "启动，已open未send",
       2: "发送，已send未接收",
       3: "接收，已接收部分数据",
       4: "完成，已经接收全部"
     }
   }
  ```

  3. xhr.setRequestHeader("MyHeader","MyValue");
  
  - 默认情况下，还会发送以下不需要设置的头部
    - Accept
    - Accept-Charset
    - Accept-Encoding
    - Aceepet-Language
    - Connection
    - Cookie
    - Host
    - Referer
    - User-Agent
  - 获取返回的头部,xhr.getResponseHeader("myheader");
  - 获取全部返回的头部，xhr.getAllResponseHeaders();

  4. POST请求

 - xhr1级：用xhr来模拟form
    - content-type: application/x-www-form-urlencoded
    - 用 serialize(form)来序列化数据; form是dom
  ```js
    function submitData(){
      var xhr = createXHR();
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if((xhr.status >= 200 && xh.status < 300 )|| xhr.status == 304){
            alert(xhr.resonseText);
          } else {
            alert("Request was unsuccessful : " + xhr.status);
          }
        };
        xhr.open("post","postexample.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var form = document.getElmentById("user-info");
        xhr.send(serialize(form));
      }
    }
  ```
- xhr2级序列化表单数据
```js
  var data = new FormData();
  data.append("key","value");
  var data2 = new FormData(document.forms[0]);
  var form = document.getElmentById("user-info");
  xhr.send(new FormData(form));

```

5. overrideMimeType方法
重写XHR响应的MIME类型，比如服务器返回的mime类型是text/plain，但数据中实际包含的是XML。根据MIME类型，即使数据是xml，responseXML属性仍然是null，通过调用overrideMImeType方法可以保证把响应当作XML而非纯文本来处理


6. 进度事件
  - loadstart
  - load
  - loadend
  - progress
  - error
  - absort

7. cors
- 简单请求：get或post，没有自定义的头部，主体内容为text/plain，并且需要额外加一个Origin头部。如果服务器认为这个请求可以接受，则返回Access-Control-Access-Origin: xxx，如果没有这个头部则或者源信息不匹配则会驳回请求。（不能设定自定义头部，不包含cookie，不能访问响应头部信息）
- Preflighted Requests：提前发送一个OPTIONS请求，并且头部有：Origin，Access-Control-Request-Mehod，Access-Control-Request-Headers这几个属性，服务器返回的头部如下：Access-Control-Allow-Origin, Access-Control-Allow-Methods, Accesss-Control-Allow-Headers, Access-Control-MAx-Age,Access-Control-Allow-Credentials

- 并不是所有的浏览器都支持第二种跨域，但是所有的请求都支持简单请求。检测XHR是否支持CORS的最简单的方法就是检查是否存在withCredentials属性，再检测XDomainRequest是否存在，就可以兼顾所以浏览器。
```js
  function createCORSRequest(method, url){
    var xhr = new XHLHttpRequest();
    if("withCredentials" in xhr){
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
      xhr = new XDomainRequest();
      xhr.open(method, url);
    }else {
      xhr = null;
    }
    return xhr;
  }
  var request = createCORSRequest("get","xxx");
  if(request){
    request.onload = function(){
      // 对request.responseText进行处理
    };
    request.send();
  }
```

## Comet
- 服务器向浏览器推送数据
- 实现comet的方法：长轮询和流
- 长沦陷：浏览器接收完数据之后随即又发送一个服务器请求
- 流：服务器保持连接打开，周期性地向浏览器发送数据
```js
// xhr实现流
function createStreamingClient(url, progress, finished){
  var xhr = new XMLHttpRequest(), received = 0;
  xhr.open("get",url,true);
  xhr.onreadystatechange = function(){
    var result;
    if(xhr.readyState == 3){
      // 只取得最新数据并且调节计数器
      result = xhr.responseText.substring(received);
      received += result.length;
      // 调用回调函数
      progress(result);
    } else if(xhr.readyState == 4){
      finished(xhr.responseText);
    }
  }
  xhr.send(null);
  return xhr;
}
var client = createStreamingClient("streaming.php", function(data){
  alert("Received: "+ data);

}, function(data){
  alert("Done!");
})
```
- 服务器发送事件: SSEAPI
  - 事件流的响应mime类型为text/eventstream
  - 响应格式为纯文本: 
    - data: foo
    - data: bar

```js
  var source = new EventSource("myevents.php");
  source = {
    open: "建立连接时触发",
    message: "接收到新事件时触发",
    error: "无法建立连接时触发"
  }
  source.onmessage = function(event){
    var data = event.data;
  }
  source.close();
```
- websocket