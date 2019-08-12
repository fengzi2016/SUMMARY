1. 前端工程化的衡量标准
- 开发角度：快
- 测试角度：快和准
- 部署角度：稳
2. 前端工程化的进化历程
- 混沌形态：前端写demo，后端写逻辑，套模版 ==> 有点像目前的 重构写demo ，前端写逻辑，套模版 【免费阅读小说】
- AJAX时期，前端包括前端逻辑、样式和html，静态资源和动态资源一同部署。会遇到以下问题：
    **开发层面**
    1. ECMAScript规范，支持浏览器兼容
    2. LESS/SASS 预编译，PostCSS自动处理hack，需要在上线前用工具进行转换
    3. 静态资源下本地的相对地址 TO 真实的URL ，即资源定位
    4. JS，CSS ，图片文件的压缩， CSS Sprites ，内嵌base64 自动生成和转换
    5. 模块依赖分析和打包
    **协作层面**
    6. 前端开发依赖后台API开发进度
    **部署层面**
    7. 静态文件（JS，CSS，图片）与动态文件（HTML模板）在同一项目中，需要服务器端工程师部署

    
3. 前端工程化流程
    1. 加入构建流程，解决开发层面问题
    - 使用Babel编译
    - 使用LESS/SASS等预编译工具边写Style
    - 使用AMD/COMMONJS等模块化方案进行模块化开发
    2. 加入本地开发服务器
    - MOCK服务，接口API文档规范（我们所缺乏的）
    - 有SSR则本地服务器应该具备HTML模版解析功能
    - 动态构建，浏览器自动刷新
    3. 静态资源和动态资源分离部署
    - 单页面应用
        - 前端掌控路由，与传统的服务器端路由相比用户体验更佳
        - 可移植，可离线使用
        - 服务器端提供的是干净的数据接口，具备高度的可复用性
        - HTML资源作为静态资源，易于部署
        - 不利于SEO
4. 前端工程化的3个阶段
1. 本地工具链
> 工程化的核心不是工具化。前端工程化是一系列工具和规范的组合，规范为蓝本，工具为实现，其中规范又包括：
> 1. 项目文件的组织结构，比如使用目录名称区别源文件和目标文件
> 2. 源代码的开发范式，比如使用既定的模块化方案，
> 3. 工具的使用规范，比如工程化自身的配置规范
> 4. 各阶段的依赖，比如部署功能的实现需要目标服务器提供SSH权限
2. 管理平台 
- 淡化环境差异性，保证构建产出的一致性
- 权限集中管理，提高安全性
- 项目版本集中管理，便于危险处理，比如版本回滚（taf）
3. 持续集成
- 前后端工程化相融合，当某个项目需要回滚时，应该减少前后端人工成本，自动回滚所有的文件
4. 脚手架
- 功能：创建项目初始文件
- 本质：方案的封装
- 执行环境的分类
    - 本地环境
    - 云管理平台或持续集成平台环境
    - 测试环境：测试工程师对产品进行仿真模拟测试的特定沙箱环境
    - 生成环境指的是产品交付给用户的真实环境
- 功能实现
    - 与构建、开发、部署等功能模块联动，在创建项目时生成对应配置项
    - 自动安装依赖模块
    - 动态可配置
    - 底层高度可扩展
    - 丰富的配置项
    - 支持多种运行环境，比如命令行和nodejsAPI
    - 兼容各类主流操作系统
 - 用户输入配置
    - 命令行 nodejs 读取原理
    - 程序运行机制


## 架构
### 为什么要讲模块化？
在阅读多本书籍中寻找共同点，并且将它们中相关的知识串联到一起，从而完善知识链。
### 为什么需要模块化
- 避免命名冲突
- 便于依赖管理
- 利于性能优化
- 提高可维护性
- 利于代码复用
1. 前端模块化的历史
- 内嵌script标签
```html
 <script></script>
```
- 外联script标签
```html
<script src="xxx"></script>
```
> 以上两者都有一个问题，污染全局环境，必须注意依赖引入顺序，内嵌标签还无法复用
- 对象和立即执行函数
```js
var myApp = {};
(function(){
  myApp.add = function(a, b) {
    return a + b;
  }  
})();
```
> 应用函数作用域来解决命名冲突，但仍然污染全局环境，而且需要注意依赖引入顺序
- commonJS
```js
module.exports = function add(a, b){
  return a+b;
}
var add = require(‘./add’);
```
> 无法支持异步加载，只适合nodejs环境
- AMD ，全称 Asynchronous Module Definition，支持异步加载

    【ps：有需求就有创造】

    ```js
    define([‘add’, ‘reduce’], function(add, reduce){
    return function(){...};
    });
    ```

    - 在使用AMD之前需要引入Require.js
    ```html
    <script data-main=”main” src=”require.js”></script>
    ```
> 语法冗长
> 参数太多
> 每一个文件都需要请求一次，影响效率

- Browserify插件，让CommonJS可以应用到浏览器中，它遍历了代码中的所有依赖树并且将它们打包为一个文件, 打包之后的样子：
```js

function e(t,n,r){
    function s(o,u){
        if(!n[o]){
            if(!t[o]){
                var a=typeof require=="function"&&require;
                if(!u&&a)return a(o,!0);
                if(i)return i(o,!0);
                var f=new Error("Cannot find module '"+o+"'");
                throw f.code="MODULE_NOT_FOUND",f
            }
            var l=n[o]={exports:{}};
            t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}
            return n[o].exports
        }
        var i=typeof require=="function"&&require;
        for(var o=0;o<r.length;o++)s(r[o]);
        return s
})({1:[function(require,module,exports){
module.exports = function add(a,b){
    return a + b;
};

},{}],2:[function(require,module,exports){
var sum = require('./sum');
var values = [ 1, 2, 4, 5, 6, 7, 8, 9 ];
var answer = sum(values)

document.getElementById("answer").innerHTML = answer;

},{"./sum":4}],3:[function(require,module,exports){
module.exports = function reduce(arr, iteratee) {
  var index = 0,
    length = arr.length,
    memo = arr[index];

  index += 1;
  for(; index < length; index += 1){
    memo = iteratee(memo, arr[index])
  }
  return memo;
};

},{}],4:[function(require,module,exports){
var reduce = require('./reduce');
var add = require('./add');

module.exports = function(arr){
  return reduce(arr, add);
};

},{"./add":1,"./reduce":3}]},{},[2]);

```
从代码可以看出Browserify主要是将文件中的代码集合起来，对文件的暴露对象exports进行了处理
- UMD 全称Universal Module Definition，为了让开发者解决不同的库用了不同的模块化方式而导致的问题
```js
    //sum.umd.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['add', 'reduce'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('add'), require('reduce'));
    } else {
        // Browser globals (root is window)
        root.sum = factory(root.add, root.reduce);
    }
}(this, function (add, reduce) {
    //  private methods

    //    exposed public methods
    return function(arr) {
      return reduce(arr, add);
    }
}));
```


- es6模块语法
```js
import sum from "./sum";
export default function sum(arr){
    return reduce(arr, add);
}
```
> 没有被所有浏览器支持，目前都需要babel转译

- webpack
    - 逆向模块化，通过配置将模块化的文件插入到HTML中
    - 支持commonJS和AMD，如果引入babel loader还可以支持es6
    - code split，多模块组合成一个bundle或多个bundle
    - loaders， 支持将css，html for template img 模块化处理
    - plugin，对bundle进行处理比如添加对bundle源映射并将捆绑包分割成块，压缩bundle等。
- Rollup，支持es6模块化，只打包用到的函数，减少了包的体积，
- SystemJS，支持在浏览器和nodejs中动态模块，包括 CommonJS, AMD, global object 和 ES6 modules，还可以用loader让它支持CoffeeScript and TypeScript.
```js
    System.import('module-name');
    System.config({
        transplier: 'babel',
        baseURL: '/app'
    });
```
- 
2. 模块核心概念
3. 模块化在不同语言中的体现
4. 前端模块化加载器的实现
5. V8如何执行javascript
6. 程序如何被运行
7. 模块化对规范的影响
8. 模块化对性能的影响
9. 前端模块化的未来
   
    
