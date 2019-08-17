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
### 1.为什么要讲模块化？
在阅读多本书籍中寻找共同点，并且将它们中相关的知识串联到一起，从而完善知识链。
### 2.为什么需要模块化
- 避免命名冲突
- 便于依赖管理
- 利于性能优化
- 提高可维护性
- 利于代码复用
### 3.前端模块化的历史
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

    require([‘add’, ‘reduce’], function(add, reduce){
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
### 4. 模块核心概念
1. 如何在nodejs中引入模块？
    - 路径分析
    - 文件定位
    - 编译执行
    - 优先从缓存中加载，nodejs缓存编译和执行后的对象

2. 路径分析
- 模块分类：
    - 核心模块：编译成了二进制文件，node启动时直接加载进内存，不需要文件定位和编译执行
    - 文件模块： 运行时动态加载，加载速度更慢
- 模块查找路径：
    - 如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件
    - 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件
    - 如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）
        - 当前文件目录下node_modules目录
        - 父目录下node_modules 目录
        - 父目录 的 父目录下node_modules 目录
        - 沿路径向上逐级递归，直到根目录下的 node_modules 目录
    - 如果参数字符串不以“./“或”/“开头，而且是一个路径，比如require('example-module/path/to/file')，则将先找到example-module的位置，然后再以它为参数，找到后续路径。
    - 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。
3. 文件定位：
- 文件拓展名分析
    - 如果文件标识不包括文件拓展名，会.js, .json, .node的次序补足拓展名，依次尝试
- 目标目录和包
    - 如果分析文件时得到的时一个目录，则会去解析当前目录下的package.json，如果没有json文件则index.js, index.json, index.node，如果还没有找到就先找之前的，所有的模块都遍历一遍之后将没有找到的模块文件报错
4. 模块编译：
- 每个模块都是一个对象
```js
function Module(id, parent) { 
    this.id = id;
    this.exports = {}; 
    this.parent = parent;
    if (parent && parent.children) {
         parent.children.push(this);
    }
    this.filename = null; 
    this.loaded = false; 
    this.children = [];
}

```
- 根据不同的拓展名进行加载
    - .js文件，通过fs模块文件同步读取文件后编译执行
    - .node文件，通过dlopen()加载
    - .json文件，通过fs读取后在JSON.parse解析
    - 其他文件都当作js文件来加载
- javascript模块的编译
    - 在编译过程中对文件内的代码进行包装，在首部添加(function (exports, require, module, __filename, __dirname) {\n，在尾部添加\n})
    ```js
        (function (exports, require, module, __filename, __dirname) { 
                var math = require('math');
                exports.area = function (radius) {
                    return Math.PI * radius * radius; 
                };
        });
    ```
    - 作用域隔离，最后返回一个函数对象，这个包装将当前的模块对象exports属性，require方法，模块自身以及文件的定位，文件目录作为参数传递给返回的函数进行执行。


### 前端模块化加载器的实现
ps: 以AMD为例，如何实现类似于Require.js这种模块加载使得开发者只需要引入Require.js就能用AMD定义模块。
1. 先复习一下AMD规范
   ```js
   // 通过ID来定义
    define(['add', 'reduce'], function(add, reduce){
    return function(){...};
    });
    // 通过ID来寻找
     require(['add', 'reduce'], function(add, reduce){
        return function(){...};
    });
    ```
2. 如何通过ID来寻找定义过的模块呢？
> 强加规定，加载路由为：basePath + 模块ID + '.js'

3. getBasePath方法，通过Javasript运行错误或者获取最后一个未加载标签的src来获取获取加载器的路径
```js

    // 适用于静动态加载
    function getBasePath() {
        // 通过javascript error 快速定位模块地址
        try {
            a.b.c()
        } catch(e) {
            var m = null;
            if(e.fileName) {
                // firefox
                return e.fileName;
            } else if(e.sourceURL) {
                // safari
                return e.sourceURL;
            }else if(e.stacktrace){
                //opera9
                    m = e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m);
                    if (m && m[1]) {
                        return m[1];
                    }     
                }else if(e.stack){//chrome 4+
                    m= e.stack.match(/\(([^)]+)\)/)
                    if (m && m[1]) {
                         return m[1];
                    }
                }
        }
        // 通过DOM定位模块地址
        var nodes = document.getElementsByTagName("script");
        // 根据IE唯一支持的属性判断是否是IE
        if(window.VBArray) {
            for(var i = 0,node; node=nodes[i++]; ){
                // 如果脚本未执行
                if(node.readyState === 'interactive') {
                    break;
                }
            }
        } else {
            node = nodes[node.length - 1];
        }
        // 根据是否有 document.querySelector来判断是否是IE8以前
        const src = document.querySeletor ? node.src : node.getAttribute('src', 4);
        return src;
    }


```
4. 如果请求路由带了防止缓存的hash值如版本号，时间戳和利用JavaScript Error的行号，为了得到纯净的路由要对url进行处理。
```js
    url = url.replace(/[?#].*/,"").slice(0, url.lastIndexOf("/")+1);
```
5. 获取当前正在加载的script
```js
    function getCurrentScript(base) {

    }
```
7. 映射，根据别名机制来定义路径
```js
// 普通的映射
    require.config({
        alias: {
            "lang": "http://www.baidu.com/lang.js",
        }
    })
// 利用了jQuery插件
require.config({
    alias: {
        'jquery': {
            src: 'http://www.baidu.com/jquery.js',
            exports: "$",
        },
        'jquery.tooltip': {
            src: 'http://www.baidu.com/script/ul/tooltip.js',
            exports: "$",
            deps:["jquery"]
        }
    }
})
```
5. require方法的作用：当依赖列表都加载完毕后，执行用户回调。
6. require方法的加载过程
- 取得依赖列表的ID，转化为URL
- 检查此模块有没有被加载过，或正在被加载。需要一个对象保存所有模块的状态。
- 如果出现循环加载，则第二个加载的模块将得到第一模块未加载完的状态，等第二模块加载完之后再加载第一个模块。
- 创建script节点，绑定onerror, onload, onreadychange等事件判断是否加载成功，然后添加href并插入DOM文档，进行加载
- 将模块的URL，依赖列表等构建成一个对象，放到检测队列中，在上面的事件触发时进行检测
8. require方法的拆分
- 转化ID为URL根据URL加载模块 【loadJSCSS】
- 检测模块的依赖情况，如果模块没有任何依赖或state都为2，就执行对应的加载工作【checkDeps】
- 从modules中收集各模块的返回值，执行回调函数，完成模块的安装【fireFactory】
- 
```js

function loadJSCSS(url, parent, ret, shim) {
    // 1. 特别处理mass | ready 标识符
    if(/^(mass|ready)$/.test(url)) {
        return url;
    }
    //2. 转化为完整路径
    if($.config.alias[url]) {
        //别名机制
        ret = $.config.alias[url];
        if(typeof ret === 'object') {
            shim = ret;
            ret = ret.src;
        }
    } else {
        if(/^(\w+)(\d)?:.*/.test(url)) {
            // 如果是完整路径
            ret = url;
        } else {
            parent = parent.substr(0, parent.lastIndexOf('/'));
            var tmp = url.charAt(0);
            if(tmp !== "." && tmp !== "/") {
                // 相对于根路径
                ret = basePath + url;
            } else if(url.slice(0, 2) === "./") {
                // 相对于兄弟路径
                ret = parent + url.slice(1)
            } else if(url.slice(0,2) === '..') {
                // 相对于父路径
                var arr = parent.replace(/\/$/, "").split("/");
                tmp = url.replace(/\.\.\//g, function() {
                    arr.pop();
                    return "";
                })
                ret = arr.join("/") + "/" + tmp;
            } else if(tmp === "/") {
                // 相对于兄弟路径
                ret = parent + url;
            } else {
                $.error("不符合模块标识规则:" + url);
            }

        }
    }
    var src = ret.replace(/[?#].*/,"");
    var ext;

    if(/\.(css|js)$/.test(src)) {
        ext = RegExp.$1;
    }
    if(!ext) {
        // 如果没有后缀名，加上后缀名
        src += ".js"
        ext = js;
    }

    // 3. 开始加载JS 或CSS
    if(ext === "js") {
        if(!modules[src]) {
            // 如果之前没有加载过
            modules[src] = {
                id: src,
                parent: parent,
                exports: {}
            };
            if(shim) {
                require(shim.deps || "", function() {
                    loadJS(src, function() {
                        // 切换模块状态为已加载完
                        modules[src].state = 2;
                        // 将返回值赋给模块的exports
                        modules[src].exports = typeof shim.exports === "function" ? shim.exports() : window[shim.exports];
                        // 检测当前模块的依赖情况
                        checkDeps();
                    });
                });
            }  else {
                // 检测当前模块的依赖情况
                loadJS(src);
            }
        }
        return src;
    } else {
        loadCSS(src);
    }
    
}

```
- 如果一个module[ src ]没有state属性表示其正在加载中

```js
// loadJS 加载JS
function loadJS(url, callback) {
    // 通过script节点加载目标模块
    var node = DOC.createElement("script");
    // 让getCurrentScript只处理类名为moduleClass的script节点
    node.className = moduleClass;
    node[W3C ?  "onload" : "onreadystatechange"] = function() {
        if(W3C || /loaded|complete/i.test(node.readyState)) {
            // factorys里装着define方法的工厂函数(define(id?,deps?,factory))
            // 提取第一个回调函数
            var factory = factorys.pop();
            // 进行循环判断并且执行
            factory && factory.delay(node.src);
            if(callback) {
                callback();
            }
            // 如果不是死链
            if(checkFail(node, false, !W3C)) {
                $.log("已成功加载" + node.src, 7)
            }
        }
    };
    // 如果节点加载失败则移除节点
    node.onerror() = function() {
        checkFail(node, true);
    }
    // 插入到head的第一个节点前，防止IE6下head标签没闭合前使用appendChild抛错
    node.src = url;
    head.insertBefore(node, head.firstChild);
}
```
- checkFial方法主要用于开发调试。javascirpt文件从加载到解析到执行需要一个过程，再interact阶段，js代码已经有一部分可以执行了，此时将模块对象的状态转化为1，如果模块的state依旧是undefined则认为它是死链，并且将此节点移除。
```js
    function checkFail(node, onError) {
        var id = node.src // 检测是否死链
        node.onload = node.onreadystatechange = node.onerror = null;
        // 如果出错或者模块没有初始化
        if(onError || !modules[id].state) {
            setTimeout(function() {
                head.removeChild(node);
            });
            $.log('加载'+ id + '失败' + onError +  " " + (!modules[id].state), 7);
        } else {
            return true;
        }
    }
```
- checkDeps方法在用户加载模块之前以及script.onload后各执行一次，检测模块的依赖情况，如果模块没有任何依赖或state都为2，就调用fireFactory方法
```js
 function checkDeps() {
     for(var i = loadings.length, id; id = loadings[--i];) {
         var obj = modules[id], deps = obj.deps;
         for(var key in deps) {
             // 如果模块没有加载成功则跳过
             if(modules[key].state !== 2) {
                 continue;
             }
         }
         // 如果模块加载成功则调用回调函数，并且继续遍历队列
         if(obj.state === 2) {
            loadings.splice(i, 1);
            fireFactory(obj.id, obj.args, obj.factory);
            checkDeps();
        } 
     }
 }
```
- fireFactory方法，从modules中收集各模块的返回值，执行factory，完成模块的安装
```js
    function fireFactory(id, deps, factory) {
        // 收集当前模块的所有依赖模块的返回值
        for(var i = 0, arr = [], d; d = deps[i++];) {
            arr.push(modules[d].exports);
        }
        var module = Object(modules[id]),
        // 回调函数调用
        ret = factory.apply(this, array);
        // 转换模块状态
        module.state = 2;
        if(ret !== void 0) {
            // 赋给exports
            module[id].exports = ret;
        }
        // 返回结果
        return ret;
    }
```
```js
window.require = $.require = function(list, factory, parent) {
    // 检测依赖是否都为2
    var deps = {},
    // 保存模块的返回值
    ars = [],
    // 需要安装的模块数
    dn = 0,
    // 已安装完的模块数
    cn = 0,
    id = parent || 'callback' + setTimeout("1");
    parent = parent || basepath // basepath 为加载器的路径
    String(list).replace($.rword, function(el) {
        var url = loadJSCSS(el, parent);
        if(url) {
            // 需要下载
            dn++;
            // 如果已经下载好了
            if(modules[url] && modules[url].state ==== 2) {
                cn++;
            }
            // 如果没有找到这个模块
            if(!deps[url]) {
                args.push(url);
                deps[url] = "去重"
            }
        }
    });
    modules[id] = {
        id: id,
        factory: factory,
        deps: deps,
        args: args,
        state: 1
    };
    // 如果所有的模块都调用好了则用返回值和模块id作为参数调用回调函数
    if(dn === cn ) {
        fireFactory(id, args, factory);
    } else {
        // 将当前需要加载的ID推出队列
        loadings.unshift(id);
    }
    // 检测当前模块依赖是否加载好
    checkDeps();
}
```
9. 定义模块define
- 拆分difine方法
    - 检测是否循环【checkCycle】
```js
 window.define =  $.define = function(id, deps, factory) {
     var args = $.slice(arguments);
     if(typeof id === "string") {
         var _id = args.shift();
     }
     if(typeof args[0] === "boolean") {
         //用于文件合并，在标准浏览器中跳过布丁模块
         if(args[0]) {
             return;
         }
         args.shift()
     }
     if(typeof args[0] === "function") {
         args.unshift([]);
         // 上线合并后能直接得到模块ID，否则寻找当前正在解析中的script节点的src作为模块ID
     }
     id = modules[id] && modules[id].state >= 1 ? _id : getCurrentScript();
     factory = args[1];
     factory.id = _id; //用于调试
     factory.delay = function(id) {
         args.push(id);
         var isCycle = true;
         try {
             isCycle = checkCycle(modules[id].deps, id);
         } catch(e) {
             console.log(e)
         }
         if(isCycle) {
             $.error(id + "模块之间存在循环依赖")
         }
         delete factory.delay; // 释放内存
         require.apply(null, args);
     }
     if(id){
         factory.delay(id, args);
     } else {
         factorys.push(fcatory);
     }
 }
 function checkCycle(deps, nick) {
    // 检测是否存在循环依赖
    for(var id in deps) {
        if(deps[id] === '去重' && modules[id].state !==  2  && (id === nick || checkCycle(modules[id].deps, nick))) {
            return true;
        }
    }
 }
```


## V8如何执行javascript
1. V8 
## 程序如何被运行
7. 模块化对规范的影响
8. 模块化对性能的影响
## 模块化在不同语言中的体现
9. 前端模块化的未来
   
    
