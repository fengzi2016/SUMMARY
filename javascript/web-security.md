# web安全

## 同源策略
- 同源策略，限制了来自不同源的“document”或脚本，对当前“document”读取或设置某些属性。
## xss 跨站脚本攻击
- 在浏览器中，< script >, < img >,< iframe >,< link > 等带有src 的标签都可以跨域加载资源而不受同源策略影响。这些标签每次加载的时候实际上是由浏览器发起了一次GET请求，不同于XMLHttpRequest的是，通过src属性加载的资源，浏览器限制了其javascript的全县，使其不能读，写返回的内容。
- 跨站脚本攻击，Cross Site Script ,通常指黑客通过“HTML”注入篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击。
- 例子：
    - 用户的输入值为代码
    - 变量在HTML标签，属性，script，事件输出
    - 将src的属性值改成后台请求API，则会发生一次GET请求
    - Post请求：构造form表单，自动提交；通过XMLHttpRequest发送
    - XSS钓鱼：伪造输入框

- XSS Payload ： 攻击者能通过恶意脚本控制用户的浏览器，这些用以完成各种功能的恶意脚本叫做XSS Payload
    - 识别用户浏览器
    - 识别用户安装的软件
    - 识别用户曾经点击过的链接
    - 获取用户的真实IP地址
- XSS攻击平台： 
    - Attack API
    - BeEF
    - XSS-Proxy
- XSS蠕虫：一般来说，用户之间发生交互行为的页面，如果存在存储型XSS，则比较容易发起XSS Worm攻击
- XSS构造技巧：
    - 利用字符编码
    - 绕过长度限制。构造script，onclick，或者利用location.hash,注释   (P246)
    - base标签：定义页面上所有使用“相对路径”标签hosting 地址
    - window.name 不受同源策略的限制，所以可以把js代码作为window.name的值
    - Flash XSS，allowScriptAccess可以限制
- 分类：
    - 反射型xss：将用户输入的数据“反射”给浏览器。非持久性，诱使用户点击一个恶意链接。
    - 存储类xss：将用户输入的数据存储在数据库，持久性。
    - Dom Based xss：通过修改页面节点来形成XSS，比如点击一个按钮动态生成一个脚本。

- 防御：
    - Cookie劫持 => httpOnly使得无法在浏览器端读取或修改cookie值，验证码
    - 输入代码 => 输入检查，输出检查：编码或转义
    - 对标签，属性，事件使用白名单
    - Dom Based XSS : 一定会调用的API，控制或检查这些API的参数
        - document.write()
        - document,writeln()
        - xxx.innerHTML()
        - xxx.outerHTML()
        - innerHTML.replace()
        - document.attachEvent()
        - inputs框
        - window.location
        - window.name
        - window.cookie 
        - ...

    
