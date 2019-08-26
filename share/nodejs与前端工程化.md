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
    define("add", [] , function(add){
        return function(){...};
    });

    require(['add', 'reduce'], function(add, reduce){
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
       var stack;
       try{
           a.b.c();
       } catch(e) {
           // e对象转字符串
           stack = e.stack;
           if(!stack && window.opera) {
               stack = (String(e).macth(/of linked script \S+/g || []).join(" "))
           }
       }
       if(stack) {
           // 对最后一行进行格式处理
           stack = stack.split(/[@ ]/g/).pop();
           stack = stack[0] === "(" ? stack.slice(1, -1) : stack.replace(/\s/,"");
           
           return stack.replace(/(:/d+)?\d+$/i, "");
       }
       // 动态加载模块，节点插入head中，只在head标签中寻找
       var nodes = (base ? document : head).getElementsByTagName("script");
       for(var i = nodes.length, node; node = nodes[--i];) {
           if(base || node.className === moduleClass) && node.readyState === "interactive" {
               return node.className = node.src;

           }
       }
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
å
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
1. 浏览器是如何渲染网页的
![渲染过程](https://pic4.zhimg.com/v2-ad0a86d3faf223164a9bd22658feadc3_r.jpg)
2. 浏览器渲染过程
- WebKit调用资源加载器加载相应资源；
- 加载器依赖网络模块建立连接，发送请求并接收答复；
- WebKit接收各种网页或者资源数据，其中某些资源可能同步或异步获取；
- 网页交给HTML解析器转变为词语；
- 解释器根据词语构建节点，形成DOM树；
- 如果节点是JavaScript代码，调用JavaScript引擎解释并执行；
- JavaScript代码可能会修改DOM树结构；
如果节点依赖其他资源，如图片\css、视频等，调用资源加载器加载它们，但这些是异步加载的，不会阻碍当前DOM树继续创建；如果是JavaScript资源URL（没有标记异步方式），则需要停止当前DOM树创建，直到JavaScript加载并被JavaScript引擎执行后才继续DOM树的创建。

3. JavaScript引擎

对于常见编译型语言（例如：Java）来说，
编译步骤分为：词法分析->语法分析->语义检查->代码优化和字节码生成。

对于解释型语言（例如 JavaScript）来说
，通过词法分析 -> 语法分析 -> 语法树，就可以开始解释执行了。
![js引擎](https://pic1.zhimg.com/v2-0f5471e21a25e237dcfae2d34a306788_r.jpg)

4. JS引擎执行过程

源代码-→抽象语法树AST-→字节码-→JIT-→本地代码(V8引擎没有中间字节码)。
- 0. 定义表达式
```haskell
<Expression> ::= 
    <AdditiveExpression><EOF>

<AdditiveExpression> ::= 
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression> ::= 
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>

```
- 1. 源代码
```js
1 + 2 * 3
```
- 2. 抽象生成AST

```js
{
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 3,
                        "raw": "3"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}

```
```js
  
  var token = [];
  const start = char => {

      if(typeof char === 'symbol') return start;
      if(/[0-9]/.test(char))
       {
          token.push(char);
          return inNumber;   
      }
      if(/[\+\-\*\/]/.test(char)
      ) {
          emmitToken("Char", char);
          return start
      }
      if(char === ' ' || char === '\r' 
      || char === '\n') {
          return start;
      }
      
  }
  const inNumber = char => {
      if(/[0-9]/.test(char)) {
          token.push(char);
          return inNumber;
      } else {
          emmitToken("Number", token.join(""));
          token = [];
          return start(char); // put back char
      }
  }
  
function emmitToken(type, value) {
    console.log(value);
}

var input = "1024 + 2 * 256"

var state = start;

for(var c of input.split(''))
    state = state(c);

state('EOF')

```
- 3. 生成Token
```js
var tokens = [{
    type:"Number",
    value: "1024"
}, {
    type:"+"
    value: "+"
}, {
    type:"Number",
    value: "2"
}, {
    type:"*"
    value: "*"
}, {
    type:"Number",
    value: "256"
}, {
    type:"EOF"
}];

```
- 4. 处理Token
```haskell
<AdditiveExpression> ::= 
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
```
```js
function AdditiveExpression(source){
    if(source[0].type === "MultiplicativeExpression") {
        let node = {
            type:"AdditiveExpression",
            children:[source[0]]
        }
        source[0] = node;
        return node;
    } 
    if(source[0].type === "AdditiveExpression" && source[1].type === "+") {
        let node = {
            type:"AdditiveExpression",
            operator:"+",
            children:[source.shift(), source.shift(), MultiplicativeExpression(source)]
        }
        source.unshift(node);
    }
    if(source[0].type === "AdditiveExpression" && source[1].type === "-") {
        let node = {
            type:"AdditiveExpression",
            operator:"-",
            children:[source.shift(), source.shift(), MultiplicativeExpression(source)]
        }
        source.unshift(node);
    }
}

function Expression(source){
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "EOF" ) {
        let node = {
            type:"Expression",
            children:[source.shift(), source.shift()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source);
    return Expression(source);
}
function AdditiveExpression(source){
    if(source[0].type === "MultiplicativeExpression") {
        let node = {
            type:"AdditiveExpression",
            children:[source[0]]
        }
        source[0] = node;
        return AdditiveExpression(source);
    } 
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "+") {
        let node = {
            type:"AdditiveExpression",
            operator:"+",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "-") {
        let node = {
            type:"AdditiveExpression",
            operator:"-",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression")
        return source[0];
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}
function MultiplicativeExpression(source){
    if(source[0].type === "Number") {
        let node = {
            type:"MultiplicativeExpression",
            children:[source[0]]
        }
        source[0] = node;
        return MultiplicativeExpression(source);
    } 
    if(source[0].type === "MultiplicativeExpression" && source[1] && source[1].type === "*") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"*",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression"&& source[1] && source[1].type === "/") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"/",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression")
        return source[0];

    return MultiplicativeExpression(source);
};

var source = [{
    type:"Number",
    value: "3"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "300"
}, {
    type:"+",
    value: "+"
}, {
    type:"Number",
    value: "2"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "256"
}, {
    type:"EOF"
}];
var ast = Expression(source);

console.log(ast);


```
- 5. 解释执行
```js

function evaluate(node) {
    if(node.type === "Expression") {
        return evaluate(node.children[0])
    }
    if(node.type === "AdditiveExpression") {
        if(node.operator === '-') {
            return evaluate(node.children[0]) - evaluate(node.children[2]);
        }
        if(node.operator === '+') {
            return evaluate(node.children[0]) + evaluate(node.children[2]);
        }
        return evaluate(node.children[0])
    }
    if(node.type === "MultiplicativeExpression") {
        if(node.operator === '*') {
            return evaluate(node.children[0]) * evaluate(node.children[2]);
        }
        if(node.operator === '/') {
            return evaluate(node.children[0]) / evaluate(node.children[2]);
        }
        return evaluate(node.children[0])
    }
    if(node.type === "Number") {
        return Number(node.value);
    }
}

```
- 6. JIT优化编译
    - 原因：在生成 AST 之后，就开始一边解释，边执行，但是有个弊端，当某段代码被多次执行时，它就有了可优化的空间（比如类型判断优化），而不用一次次的去重复之前的解释执行。 编译型语言如 JAVA，可以在执行前就进行优化编译，但是这会耗费大量的时间，显然不适用于Web交互。
    - 流程
        1.在 JavaScript 引擎中增加一个监视器（也叫分析器）。监视器监控着代码的运行情况，记录代码一共运行了多少次、如何运行的等信息，如果同一行代码运行了几次，这个代码段就被标记成了 “warm”，如果运行了很多次，则被标记成 “hot”。

        2.（基线编译器）如果一段代码变成了 “warm”，那么 JIT 就把它送到基线编译器去编译，并且把编译结果存储起来。比如，监视器监视到了，某行、某个变量执行同样的代码、使用了同样的变量类型，那么就会把编译后的版本，替换这一行代码的执行，并且存储。

        3.（优化编译器）如果一个代码段变得 “hot”，监视器会把它发送到优化编译器中。生成一个更快速和高效的代码版本出来，并且存储。例如：循环加一个对象属性时，假设它是 INT 类型，优先做 INT 类型的判断

        4.（去优化）可是对于 JavaScript 从来就没有确定这么一说，前 99 个对象属性保持着 INT 类型，可能第 100 个就没有这个属性了，那么这时候 JIT 会认为做了一个错误的假设，并且把优化代码丢掉，执行过程将会回到解释器或者基线编译器，这一过程叫做去优化。



## 模块化开发
- 独立的算法和单元
- 分模块加载问题
    - 重复代码只加载一次
    - 多次复用的代码进行缓存
    - 文件次序，反向插入思想
- webpack中的模块化
- 将JS资源视为一切资源的入口，将项目构建输出的js和css逆向注入到文档中
    ```js
        new HtmlWebpackPlugin({
            // 构建输出文件
            filename: 'dist/index.html',
            // 源文件
            template: 'src/index.html',
            // 自动注入chunks
            inject: true,
            // 注入的chunks
            chunks: ['main.home', 'main.auth'],
            // chunk的排序规则
            chunksSortMode: 'auto'
        })

        // chunksSortMode 例子
        chunksSortMode:(chunkA, chunkB) => {
            const order = ['main.home','main.auth'];
            const orderA = order.indexOf(chunkA.name[0]);
            const orderB = order.indexOf(chunkB.name[0]);
            if(orderA > orderB) {
                return 1;
            } else if(orderA < orderB) {
                return -1;
            } else {
                return 0;
            }
        }
    ```
## 前端模块化的未来

   
    
