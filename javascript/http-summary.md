# 图解HTTP
## http/1.1可使用的方法
1. GET：请求报文
2. POST： 传输实体主体
3. PUT：传输文件
4. HEAD: 获得报文首部
5. DELETE: 删除文件
6. OPTIONS: 询问支持的方法
7. TRACE: 追踪路径。引发跨站追踪
8. CONNECT: 要求用隧道协议连接代理。SSL，TLS

## 知识点
- 持久连接 keep-alive 减少TCP建立和连接的开销。只要没有明确提出断开就保持TCP连接
- 管线化，不用等待响应亦可直接发送下一个请求
- cookie 服务器端生成，为了克服无状态的缺点。创建cookie时如果不指定生存有效时间，则cookie只在浏览器关闭前有效，cookie会在服务器端和客户端传输，但是不会保存在客户机的磁盘上，打开新的浏览器将不能获得原先创建的cookie信息。
- 范围请求 请求内容的一部分，Content-Range:500-1000 ，返回206 Partial Content,如果不能分段请求则返回所有，状态码200
- 内容协商机制是指客户端和服务端就响应的资源内容进行交涉，选择合适的资源。有语言，字符集，编码方式等选择。包括 Accept，Accept-Charset，Accept-Encoding，Accept-Language，Content-Language



## 状态码
- 2xx 成功
- 204 操作成功，返回头部，不返回响应主体
- 206 范围请求成功
- 3XX 重定向，表明浏览器需要执行某些特殊的处理以正确处理请求
- 301 永久性重定向
- 302 临时性重定向 ， 303 要改成GET方法请求的临时性重定向
- 304 表示客户端发送附带条件的请求时，服务器允许访问资源，但是未满足条件
- 4XX 客户端错误
- 400 请求报文里有语法错误
- 401 请求需要有通过HTTP认证的认证信息
- 403 表明请求资源的访问被服务器拒绝
- 404 没有找到资源
- 5XX服务器错误

## HTTP首部
1. 首部的字段格式：
> 首部字段名：字段值【多个，用逗号分隔】

2. 首部的分类

- 端到端首部。分在此类别中的首部会转发给请求 / 响应对应的最终接收目标，且必 须保存在由缓存生成的响应中，另外规定它必须被转发。
- 逐跳首部。分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再 转发。HTTP/1.1 和之后版本中，如果要使用 hop-by-hop 首部，需提 供 Connection 首部字段。

3. 首部字段
- 通用首部字段 （请求和响应报文）
    - 字段列表
        - Cache-Control 控制缓存行为
        - Connection 逐跳首部，连接的管理
        - Date 创建报文的时间
        - Pragma 报文指令
        - Trailer 报文末端的首部一览
        - Transfer-Encoding 指定报文主题的传输编码方式
        - Upgrade 升级为其它协议
        - Via 代理服务器的相关信息
        - Warning 错误通知
 - 请求首部字段
    - 字段列表
    - Accept 用户代理可以处理的媒体类型
    - Accept-Charset 优先的字符集
    - Accept-Encoding 优先的内容编码
    - Accept-Language 优先的语言（如中文）
    - Authorization Web认证信息
    - Expect 期待服务器的特定行为
    - From 用户的电子邮箱地址
    - Host 请求资源所在服务器
    - If-Match 比较实体标记（ETag）
    - If-Modified-Since 比较资源更新时间
    - If-None-Match 比较实体标记（与If-Match相反）
    - If-Range 资源未更新时发送实体Byte的范围请求
    - If-UnModified-Since 比较资源的更新时间，与If-Modified-Since相反
    - Max-Forwards 最大传输逐跳数
    - Proxy-Authorization 代理服务器要求客户端的认证信息
    - Range 实体的字节范围请求
    - TE 传输编码的优先级
    - User-Agent HTTP客户端程序的信息
- 响应首部字段
    - 字段列表
        - Accept-Ranges 是否接收字节范围请求
        - Age 推算资源创建经过时间
        - ETag 资源的匹配信息
        - Location 令客户端重定向至指定URI
        - Proxy-Authenticate 代理服务器对客户端的认证信息
        - Retry-After 对再次发起请求的时机要求
        - Server HTTP服务器的安装信息
        - Vary 代理服务器缓存的管理信息
        - WWW-authenticate 服务器对客户端的认证信息
- 实体首部字段
    - 字段列表
        - Allow 资源可支持的HTTP方法
        - Content-Encoding 实体主体适用的编码方式
        - Content-Language 实体主体使用的自然语言
        - Content-Length 实体主体的大小
        - Content-Location 替代对应资源的URI
        - Content-MD5 实体主体的报文概要
        - Content-Range 实体主体的位置范围
        - Content-Type 实体主体的媒体类型
        - Expires 实体主体过期的日期时间
        - Last-Modified 资源的最后修改日期时间
## 缓存 (要知道在不同的角度去看，服务器的头部和客户端的首部解释不一样)
缓存不仅可以存在于缓存服务器（代理）内，还可以存在客户端浏览器中（都在磁盘上）

- 缓存请求指令
- 缓存响应指令

![cache](http://m.qpic.cn/psb?/V13Sdu2D3uI4IT/1pUPTmTidI4XawZHq*9*6MtIAz23G64FiZaODU8s7tY!/b/dDABAAAAAAAA&bo=lQNgAwAAAAADB9c!&rf=viewer_4)




### Cache-Control
- 使用 no-cache 指令的目的是为了防止从缓存中返回过期的资源。 客户端发送的请求中如果包含 no-cache 指令，则表示客户端将不会接 收缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发 给源服务器。如果服务器返回的响应中包含 no-cache 指令，那么缓存服务器不能对 资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资 源有效性进行确认，且禁止其对响应资源进行缓存操作

- s-maxage>max-age>Expires

### Connection

Connection 首部字段具备如下两个作用。
- 控制不再转发给代理的首部字段
- 管理持久连接.HTTP/1.1 版本的默认连接都是持久连接。为此，客户端会在持 久连接上连续发送请求。当服务器端想明确断开连接时，则指定 Connection 首部字段的值为 Close.HTTP/1.1 之前的 HTTP 版本的默认连接都是非持久连接。为 此，如果想在旧版本的 HTTP 协议上维持持续连接，则需要指定 Connection 首部字段的值为 Keep-Alive。

### Date

首部字段 Date 表明创建 HTTP 报文的日期和时间。

###  Trailer
首部字段 Trailer 会事先说明在报文主体后记录了哪些首部字段。该 首部字段可应用在 HTTP/1.1 版本分块传输编码时


### 机构认证
### 客户端认证
### 安全问题
- 主动攻击
- 被动攻击
