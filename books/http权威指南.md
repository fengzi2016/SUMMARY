# 从0开始学http

## 第1章. 概述

### 关键词

#### 1.1

- 媒体类型 MIME
- URI ，URL， URN
- 事务
- 状态码
- 报文
- 连接
- web结构组件

总结： 

web服务器为每个http对象数据附加MIME类型，浏览器在接收数据时查看此字段，判断能否处理这种对象。

URI包括URL和URN，URL标识者资源唯一路径，URN标识者足以唯一名称。

事务包括客户端请求和服务器反应这2个阶段。

报文是纯文本形式，包括起始行，首部，主体。

状态码是3位字符，还有描述文字。

连接步骤：

1. 客户端从URL中解析服务器的主机名
2. 客户端将主机名换为IP地址（DNS）
3. 客户端解析端口号（默认80）
4. 客户端与服务器端建立一条TCP连接（3次握手）
5. 客户端发送HTTP请求报文
6. 服务器返回HTTP响应报文
7. 关闭连接，显示数据

web结构组件

1. 代理
2. 缓存
3. 网关
4. 隧道
5. Agent代理


## 第二章. URL与资源

### 关键词

- URL的格式，方案，服务器位置，资源路径
- URL通用格式
  > < scheme >://< user >:< password >@< host >: < port >/< path >;< params >?< query >#< frag >
- 通用URL组件
  - 方案（协议）
  - 用户
  - 密码
  - 主机
  - 端口
  - 路径
  - 参数
  - 查询
  - 片段
- 相对URL，[转为绝对URL](https://wx1.sinaimg.cn/mw690/006P0MECgy1g15w6681zyj30pm0n977d.jpg)
- 自动拓展ULR，主机名拓展，历史拓展
- URL编码机制
- 方案列表
  - http(超文本传输协议)
  - https(ssl)
  - mailto(邮件)
  - ftp(文件传输)
  - rtsp,rtspu（实时流传输协议）
  - file(指定主机本地)
  - news(新闻组)
  - telnet(交互式业务)


## 第三章HTTP报文

### 关键词
- 请求报文格式
```
  method request-URL version
  headers

  entity-body
```
- 响应报文格式
```
  version status reason-phrease
  headers

  entity-body
```
- http方法
  - get 
  - head 获取文档首部
  - post
  - put 存储
  - trace 跟踪
  - options 可选方法
  - delete
- 状态码分类
  - 1XX 信息提示
  - 2XX 成功
  - 3XX 重定向
  - 4XX 客户端错误
  - 5XX 服务器端错误
- 状态码分析
  - 100 Continue ，询问服务器端是否能解析某个实体
  - 2XX （OK，只返回部分，已被接受但是没有执行，创建了某对象，返回的是副本，只返回首部和起始行，清除浏览器表单元素）
  - 3XX （有多个版本，已被移除，临时移除，未修改用缓存，必须用代理）
  - 4XX （请求错误，未认证，被拒绝，找不到，方法不被允许，实体无法接受，需要认证代理，请求超时）
  - 5XX （出错无法服务，超出范围，网关无法连接，超时，协议版本无法支持）