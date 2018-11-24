# 懒加载

[参考链接](https://github.com/barretlee/performance-column/issues/2)

## link rel过程
![pic](https://cloud.githubusercontent.com/assets/11738111/23639262/bc678c2e-0321-11e7-876d-a0890557f7ef.png)
## DNS Prefetch
[参考链接](https://github.com/barretlee/performance-column/issues/3)
- DNS Prefetch就是根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中，缩短DNS解析时间，来提高网站的访问速度。

### 使用DNS Prefetch

- 自动解析
  - 关键词： href，https
> Chromium使用超链接的href属性来查找要预解析的主机名。当遇到a标签，Chromium会自动将href中的域名解析为IP地址，这个解析过程是与用户浏览网页并行处理的。但是为了确保安全性，在HTTPS页面中不会自动解析。

- 自动解析控制
    - 关键词：https，http-equiv，content
    - 开启：
    ```html
        <meta http-equiv="x-dns-prefetch-control" content="on">
    ```
    - 关闭
    ```html
        <meta http-equiv="x-dns-prefetch-control" content="off">
    ```

- 手动解析
    - 关键词 ： link rel="dns-prefetch"

        ```html
        <link rel="dns-prefetch" href="//img.alicdn.com">
        ```
### 使用场景

- 登录页，我们可以提前在页面上进行下跳页用到资源的 DNS Prefetch
- 新用户访问，后端可以通过 Cookie 判断是否为首次进入站点，对于这类用户，DNS Prefetch 可以比较明显地提升访问速度

## Preload
[参考链接](https://github.com/barretlee/performance-column/issues/4)

> Preload其实一项新的 web 标准，使得 web 开发者可以对加载细节做进一步控制,可以自定义加载逻辑。

### 使用方法
- 加载非标签资源
```html
<link rel="preload" href="xxx.js" as="script">

```
- 加载字体
```html
<link rel="preload" href="font.woff2" type="font/woff2" crossorigin >
```
- 只加载不执行
```js
var preload = document.createElement('link');
preload.rel = 'preload';
preload.href = 'myscript.js';
preload.as="script";
document.head.appendChild(preload);

```

## Prerender

[参考链接](https://github.com/barretlee/performance-column/issues/5)

Prerender 是指，在内容下载之后开始渲染。更具体的说，Prerender 通过指定加载某一些必要的资源，让用户代理提取和执行，从而在接下来请求资源的时候，用户代理可以更快的响应。

用户代理可以通过抓取必要的子资源并解析（例如预渲染页面）来对 HTML 的响应进行一个预处理。

### 用法

- 基本用法：整个页面及其相关资源都会被提前下载
```html
    <link rel="prerender" href="checkout.html"> 
```
- 根据用户行为插入预渲染行为
```js
    var hint = document.createElement('link')
hint.setAttribute('rel', 'prerender')
hint.setAttribute('href', 'next-page.html')
 
document.getElementByTagName('head')[0].appendChild(hint)
```