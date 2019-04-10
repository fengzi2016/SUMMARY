# 跨站攻击-http2-react安全
**请简要概括和联系以上名词**
- xss是一种跨站网络攻击。主要通过前端的dom注入方法来达成攻击，涉及的标签有 script，img的src，div的style等等。目的就是为了获取cookie，或者利用植入flash通过crossdomain来获取更高的操作权限，以被攻击者的身份进行后台操作（结合csrf），也可以造成拒绝服务的后果。
- http2是一种升级的协议，它拥有的功能高度兼容http1.1的核心功能，除此之外还支持服务器和客户端可以选择协议，二进制数据传输，http的头部数据压缩（只发送与上一次请求的差异头部），服务器端推送，流水线的请求（不用等待回应就可以发送数据），修复HTTP 1.x中的前端阻塞问题（一条TCP的connection在同一时间只能允许一个请求经过，），在一个tcp连接上实现多路复用功能（在同一个域名下，开启一个TCP的connection，每个请求以stream的方式传输，每个stream有唯一标识，connection一旦建立，后续的请求都可以复用这个connection并且可以同时发送，server端可以根据stream的唯一标识来相应对应的请求。），支持http现有的平台使用。
- react中曾经出现过xss攻击漏洞，它来自于服务器端渲染时，如果用户存储的props被利用，注入了dangeroulySetInnerHTML，那么当数据被传送到客户端渲染的时候就会被解析为html，导致xssDOM注入，所以react就用一个新的属性$$typeof:Symbol.for("react.element")来确保不是后台发送来的element否则不处理。react app利用打包工具webpack在被请求时经常被模块化，适用于http1.x，当应用http2时，模块化将不被适用，直接发送整个bundle能更好得被压缩，而且http2时基于流且一个连接多路复用的。

- 参考链接
[HTTP/2 幕后原理](https://www.ibm.com/developerworks/cn/web/wa-http2-under-the-hood/index.html)