# 从0开始学http

## 第1章. 概述

### 关键词

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
- 相对URL，![转为绝对URL](https://wx1.sinaimg.cn/mw690/006P0MECgy1g15w6681zyj30pm0n977d.jpg)
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


## 第四章 TCP流
### 关键词
- TCP流是分段的，由IP分组负责发送，IP分组（IP分组首部，TCP段首部，TCP数据块）
- HTTPS 分层： HTTP（应用层） =》 SSL或TCL（安全层） =》 TCP（传输层） =》 IP（网络层） =》 网络接口（数据链路层）
- TCP连接标识（源IP， 源端口，目的IP地址，目的端口）
- TCP套接字（函数集合）
  - s = socket(< params >) 创建新的套接字
  - bind(s, < local IP:port >) 向套接字赋一个本地接口和端口
  - connect(s, < remote IP:port >)创建一个连接本地套接字和远程主机及端口的连接
  - listen(s,...) 标识一个本地套接字，使其可以合法接受连接
  - s2 = accept(s) 等待某人建立一条到本地端口的连接
  - n = read(s, buffer, n) 尝试从套接字向缓冲区读取n个字节
  - n = write(s, buffer, n) 尝试从缓冲区向套接字写入n个字节
  - close 完全关闭tcp连接
  - shutdown(s,< side >)只关闭TCP连接的输入或输出端
  - getsockopt(s,...) 读取某个内部套接字配置选项的值
  - setsockopt(s,...) 修改某个内部套接字配置选项的值
- TCP套接字编程例子

![例子](http://m.qpic.cn/psb?/V13Sdu2D3uI4IT/VD*NquTsMLE46EOsCjAdpjyZPIhjzrMbS0*yl9ztoSE!/b/dDYBAAAAAAAA&bo=oAU4BAAAAAARB6k!&rf=viewer_4)

- TCP性能
  - TCP时延：建立连接，TCP慢启动，数据聚集Nale算法
  - 串行事务(时延高)，优化：

    - 并行连接(多条TCP连接并行发送)，
    - 持久连接（重用连接，http1.0: keep-alive, 而http1.1里一定是持久连接，如果不需要则发送头部Connection:close），
    - 管道化连接(共享TCP连接)
    - 复用连接
  - 连接双方可以随时关闭连接，所以双方都要对到达关闭了的连接的数据进行处理

## 第五章 Web服务器
### 关键词
- 用于HTTP调试的最小型Perl Web 服务器
```perl
  #!/usr/bin/perl
  use Socket;
  use Carp;
  use FileHandle;
  # 将8080作为默认端口
  $port = (@ARGV ? @ARGV[0] : 8080)
  # 创建本地TCP socket ，绑定端口并且让它可以接受连接
  $proto = getprotobyname('tcp');
  socket(S, PF_INET, SOCK_STREAM, $proto) || die;
  setsockopt(S, SOL_SOCKET,SO_REUSEADDR, pack("1",1))|| die;
  bind(S, sockaddr_in($port, INADDR_AND)) || die;
  listen(S, SOMAXCONN) || die;
  # 打印启动信息
  printf("<<Type-O-Serve Accepting on Port %d>>\n\n",$port);

  while(1){
    # 等待连接C
    $cport_caddr = accept(C,S);
    ($cport,$caddr) = sockaddr_in($cport_caddr);
    C->autoflush(1);

    # 打印连接来源
    $canme = gethostbyaddr($caddr,AF_INET);
    printf("<<Request From '%s'>>\n", $cname);

    # 读取请求数据直到换行
    while($line = <C>){
      print $line;
      if($line = ~/^\r/){last;}
    }
    # 等待服务器输入返回信息，发送回复行直到读取到".
    while($line = <STDIN>){
      $line = ~ s/\r//;
      $line = ~ s/\n//;
      if($line = !/^\./){last;}
      print C $line . "\r\n";
    }
    close(C);
  }

```

- 实际的Web服务器
  1. 建立连接
  2. 接收连接
  3. 处理请求
  4. 访问资源
  5. 构建响应
  6. 发送响应
  7. 记录事务处理过程（日志）
- 连接的输入/输出处理结构
  - 单线程Web服务器
  - 多进程及多线程Web服务器
  - 复用I/O的服务器
  - 复用的多线程Web服务器
- docroot（根目录），查找资源就是从请求报文中获取URI，并将其附加在文档根目录后面
- 虚拟托管docroot会根据URL或HOST首部的IP地址或主机名来识别正确的文件根目录。通过这种方式即使请求URL完全相同，托管在同一Web服务器上的两个Web站点也可以拥有完全不同的内容
- 请求资源可以是静态，也可以是动态的执行程序
- MIME类型：
  - 魔法分类（用模式表参照）
  - 显式分类（强制特定）
  - 类型协商（最好）
- 重定向
  - 永久删除资源
  - 临时删除资源
  - URL增强
  - 负载均衡
  - 服务器关联
  - 规范目录名称


## 第六章 代理

### 关键词

- 代理分类
  - 公共
  - 私有
- 代理与网关的区别
  - 代理两端的协议需要相同，但是协议版本可以不同
  - 网关两边协议可以不同，网关负责转化
- 为什么要使用代理
  - 儿童过滤器
  - 文档访问控制
  - 安全防火墙
  - Web缓存
  - 反向代理：假扮Web服务器，接收对web服务器的真实请求，发起对其它服务器的通信，以便按需定位所请求的内容。
  - 内容路由器：根据因特网流量和内容类型将请求导向特定的服务器。
  - 转码器：修改内容的主体格式
  - 匿名者： 删除http报文中的身份特性（客户端IP，From首部，referer首部，cookie，uri的会话id）

- 部署代理的方法
  - 出口代理（防火墙，降低带宽，提高流量性能）
  - 访问代理（存储文档副本）
  - 反向代理（代理直接冒用服务器的名字和IP）
  - 网络交换代理
- 动态选择父代理的例子
  - 负载均衡（子代理根据父代理的工作负载级别来选择）
  - 地理位置附近的路由
  - 协议/类型路由
  - 基于订购的路由（额外付费的高性能服务）
- 代理是如何获取流量的
  - 修改客户端（手动和自动配置代理）
  - 修改网络（物理设备，拦截代理）
  - 修改DNS命名空间（手动配置代理冒用服务器IP）
  - 修改Web服务器（重定向到代理）
- Via 首部 表示经过的代理
  1. 响应代理与请求代理的顺序相反
  2. 组成（以逗号分割）
      - 协议【可选】
      - 版本【必写】
      - 域名【必写】
      - 地址相关【可选】
  3. 如果是http请求可以省略协议，否则需要写协议。
  4. 例子 
  ```
  <= Recv header, 143 bytes (0x8f)
  0000: Via: http/1.1 ctc.shanghai.ha2ts4.127 (ApacheTrafficServer/6.2.1
  0040:  [cSsSfU]), http/1.1 ctc.wuhan.ha2ts4.30 (ApacheTrafficServer/6.
  0080: 2.1 [cRs f ])
  <= Recv header, 51 bytes (0x33)
  ```
  5. 为保护信息，via的域名可以简写
- Server首部对原始服务器进行描述
- TRACE方法跟踪经过了几个代理，并且代理对报文进行了怎么样的修改
- Max-Forwards限制TRACE和OPTIONS请求所经过的代理跳数
- 代理认证：代理返回407表示需要客户端进行认证，并且用Proxy-Authoizate首部告诉客户端如何进行认证，客户端在Proxy-Authoization首部返回认证信息
- OPTIONS 方法请求服务器端支持的方法，返回在Allow首部。如果Allow首部是在请求首部的话是建议服务器在新的资源上支持这些方法。