# 网页优化
## 一. 关键术语
### 1.1 渲染树
0.
    - 当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行。
    - JavaScript 可以查询和修改 DOM 与 CSSOM。
    - JavaScript 执行将暂停，直至 CSSOM 就绪
    - 脚本在文档中的位置很重要。
1. 处理HTML标记并构建DOM树
2. 处理CSS标记并构建CSSOM
3. 将DOM与CSSOM合并为一个渲染树
    - 某些节点不可见，被忽略
    - 某些节点被CSS隐藏，比如“display：none”，被忽略
    - 可见节点适配CSSOM并应用
    - 发射可见节点，连同其内容和计算样式
4. 根据渲染树来布局，以计算每个节点的几何信息
5. 将各个节点绘制到屏幕上
### 1.2 First Contentful Paint

*第一次内容渲染*

#### 1.2.1 减少javascript，css的下载时间

- 阻塞渲染的CSS

> 利用css的媒体类型和媒体查询来解决这种问题

例子：1.
```html
<!-- 阻塞渲染，适用于所有情况 -->
<link href="style.css" rel="stylesheet">
<!-- 打印网页时应用，因此网页首次加载时，它不会阻塞渲染 -->
<link href="print.css" rel="stylesheet" media="print">
<!-- 动态媒体查询，将在网页加载时计算。根据网页加载时设备的方向，portrait.css 可能阻塞渲染，也可能不阻塞渲染。 -->
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<!-- 根据屏幕的大小 -->
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
```
2. 
```html
  <!-- 提前连接 -->
 <link rel="preconnect"> 
 <!-- 提前获取dns -->
 <link rel="dns-prefetch"> 
 <!-- 在浏览器空闲的时候预先获取 -->
 <link rel="prefetch"> 
 <!-- 在依赖文件加载的时候同时加载 -->
 <link rel="preload"> 
```

- 下载的第三方资源

1. 第三方资源组成：
 - 第三方JavaScript通常是指可以直接从第三方供应商嵌入到任何站点中的脚本。这些脚本可以包括广告、分析、小部件和其他使web更加动态和交互式的脚本。
 比如：
  > - Social sharing buttons (e.g Twitter, Facebook, G+)
  > - Video player embeds (e.g YouTube, Vimeo)
  > - Advertising iframes
  > - Analytics & metrics scripts
  > -  A/B testing scripts for experiments
  > - Helper libraries (e.g date formatting, animation, functional libraries etc)

2. 第三方资源的风险：阻塞性能，隐私安全，不可预测.

3. 寻找一个网页中的第三方资源
  - 工具：Chrome Devtools, PageSpeed, WebpageTest
  - Chrome Devtools 寻找方法:
    > To show third party badges, navigate to any panel in the Chrome DevTools and hit CMD + Shift + P to bring up the Command Menu. Next enter in "Show third party badges".

4. 如何评价第三方资源对页面性能的影响
- javascript的启动时间
- Chrome DevTools Performance panel
  > Here, you can use the "Group by product" option in the Bottom-Up tab to group third-parties by the time they spent. This helps identify which third party products were the most costly. The Network panel also supports an option to highlight requests by product.
- 使用长任务检测昂贵的iframe
  -  JavaScript PerformanceObserver API 
  - observe longtask entries. 

5. 如何提高第三方资源的性能
- 异步或者推迟脚本的下载。
```html
  <script src="app.js" async></script>
  <script src="app.js" defer></script>
```
- 如果第三方服务器运行缓慢，请考虑自托管脚本。
- Consider Resource Hints like < link rel=preconnect> or < link rel=dns-prefetch> to perform a DNS lookup for domains hosting third-party scripts.


#### 1.2.2 使用缓存
#### 1.2.3 使用GZIP在传输过程中压缩
#### 1.2.3 JAVASCRIPT 启动优化
- 仅发送用户所需代码
- 源码压缩和代码分离
  - UglifyJS 压缩es5代码
  - babel-minify 来压缩es2015+
  - [webpack代码分离](https://webpack.js.org/guides/code-splitting/)
    - 手动分离入口文件，输出不同的出口文件
    - 利用 SplitChunksPlugin避免重复加载，这样做将会额外加载一个公共的文件
    ```js
    module.exports = {
       optimization: {
         splitChunks: {
           chunks:'all'
         }
      }
    }
    ```
    - 动态引入
    ```js
      function importA(){
        return import(/*webpackChunkName:"A"*/ 'A').then(({default: _})=>{
          return _.name;
        }).catch(e => 'error occurred when loading A')
      }
    ```
  - 移除未使用代码
  - 缓存代码
    - http缓存，max-age，Etag
    - Service Work
    - webpack 文件名哈希值


## 前端监控
### 前端数据监控原理
- [前端数据监控](https://juejin.im/post/5a5ba6616fb9a01ca7136a8f)

## 工具

- Chrome DevTools Network Request Blocking，可以模拟阻塞请求
- WebPageTest 模拟阻塞以及控制传输速度