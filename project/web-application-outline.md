# 基于node和koa的小型web应用程序

## 开发流程

1. 需求分析，做出ER图。
2. 将ER图转化为实体图（包括实体和属性）。
3. 写好API文档，其中包括技术选型和数据库数据内容，前后台数据传输规范。
4. 数据库创建模式和基本表，当然数据应该保证完整性和保密性。
5. 写后台API，可以通过postman测试。
6. 写前台界面，这个时候我们已经保证前后台数据流通了，页面代码写好后修改一下前台API取得的DOM元素就可以。
7. 最后综合，测试，完善，拓展，结束。

## 技术选型
**后台开发环境：** Node.js

**后台开发框架：** koa

**数据库：** Mysql

**应用测试，打包，发布以及服务器部署调整数据库工具：** docker

**前端框架：** react

**前台API：**



## 涉及的技术
- **Node.js**

它是由C++语言编写的后端的Javascript运行环境。支持的编程语言是Javascript，在项目中用于编写后端服务器代码，接受前台js发送给后台的数据以及进行处理。

    Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world. 
                                                    --Node.js官网
特点：
 1. 采用Google Chrome浏览器的V8引擎
 2. 采用事件驱动，异步编程
 3. 有npm作为其资源库

- **koa**

 koa是基于Node.js平台的下一代web开发框架。

 *为什么我们要用开发框架？*

 虽然我们可以利用Node.js封装的方法和原生的javascript来写后台的API,但是如果我们使用像express,koa这种框架，代码量和逻辑会变得更简单。

*为什么要用koa？*

koa是express框架的发展，相对与express，koa更轻便和健壮。不同于express基于ES5语法，我们只能使用回调来解决异步问题;而koa是基于ES6的generator，用generator实现了异步,使得代码变得更简洁。尤其是koa2基于ES7,使用Promise并配合async来实现异步。


  我的理解是Node.js是让javasript可以作为后端编程语言的运行环境，或者说将javascript解析成可以控制电脑进程或者http传输的语言。而koa则是开发的“语法糖”，它封装的很多方法（函数）使得程序员在编写后台API时更简单。



- **docker**

- **Mysql**
- **react**
- 



1. 需求分析
 用户系统：
            游客：阅读
            用户：阅读，发表，评论
            管理员：审批用户，控制热点
            超级管理员：管理管理员
  
 种类：
        前端
        后端
        安卓
        产品
        设计


 2. 实体

 用户
 文章
 评论 
 种类
 <!-- 视频
 图片 -->
 

3. 数据库内容
 种类表：
        content

 用户表：
        user_id  [key]
        user_name
        user_email [key]
        user_pwd
        user_avatar_url
        user_role
        user_activation_code
        user_status
  
文章表:
        article_id
        article_title
        article_content
        <!-- article_time -->
        article_author_id
        article_ category

评论表:
        comment_id
        comment_content
        comment_time
        comment_author_id

用户-文章关系表:
      id
      user_id
      article_id
      time

用户-评论关系表：
     id
     user_id
     article_id
     comment_id
     time
文章-评论关系表：
    id
    article_id
    comment_id
    time


4. API

0. 注册||激活码，登录
1. 获取主页
2. 获取各类别页面
3. 获取个人中心
4. 获取某篇文章的详情包括评论
5. 删除某篇文章
6. 删除某篇评论
7. 修改个人中心
        修改资料

        修改邮箱

        修改密码
8. 发表评论
9. 发表文章
10. 修改文章






  