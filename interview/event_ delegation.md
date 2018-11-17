# 事件机制
参考链接
[EventTarget.addEventListener]()
(https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
[事件机制]https://github.com/InterviewMap/CS-Interview-Knowledge-Map/blob/master/Browser/browser-ch.md#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91%E4%B8%89%E9%98%B6%E6%AE%B5()
[事件介绍](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)
- 一系列事件：
事件在浏览器窗口中被触发并且通常被绑定到窗口内部的特定部分 — 可能是一个元素、一系列元素、被加载到这个窗口的 HTML 代码或者是整个浏览器窗口。
- 事件类型分类
    - 资源事件，常见：error，absort，load
    - 网络事件，获得网络：online，失去网络：offline
    - 焦点事件，blur，focus
    - websocket事件：常见：message，error，close
    - 会话历史事件：pagehide，pageshow，popstate
    - css绘画事件：animationstart，animationend，animationiteration（重绘时）
    - 表单事件：reset，submit
    - 打印事件：beforeprint，afterprint
    - 文本组合事件：compositionstart，compositionupdate，compositionend
    - 视图事件：fullscreenchange，scroll，resize，fullscreenerror
    - 剪切板事件：cut，copy，paste
    - 键盘，鼠标，拖拽，媒体事件，进度事件等等

- 使用网页事件的方式：
    - 事件处理属性 onclick
    - 行内事件处理器 不推荐使用
    ```html
     <button onclick="bgChange()">Press me</button>
    ```
    - addEventListener()和removeEventListener() 推荐使用
    ```js
        btn.addEventListener('click', bgChange);
    ```


- 详细介绍重点addEventListener
```js
    target.addEventListener(type, listener[, options]);

    target.addEventListener(type, listener ,{capture: Boolean, passive: Boolean, once: Boolean});
    // capture：true 捕获，false：冒泡（默认）
    // passive：表示 listener 永远不会调用 preventDefault()，如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
    // once 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
    target.addEventListener(type, listener[, useCapture]);
```
   0. 优点
    - 它允许给一个事件注册多个监听器。 特别是在使用AJAX库，JavaScript模块，或其他需要第三方库/插件的代码。
    - 它提供了一种更精细的手段控制 listener 的触发阶段。（即可以选择捕获或者冒泡）。
    - 它对任何 DOM 元素都是有效的，而不仅仅只对 HTML 元素有效。
   1. 事件目标可以是一个文档上的元素 Element,Document和Window或者任何其他支持事件的对象 (比如 XMLHttpRequest)。
   2. 注意尽管匿名函数和箭头函数有些类似，但是他们绑定不同的this对象。匿名函数（和所有传统的Javascript函数）创建他们独有的this对象，而箭头函数则继承绑定他所在函数的this对象。这意味着在使用箭头函数时，原函数中可用的变量和常量在事件处理器中同样可用。
   3. 在处理事件时注册事件，则后者不会立即被触发，但在后面的触发阶段中会被触发。比如捕获时注册，冒泡时触发
   4. 重复的会被自动抛弃。
   5. 监听的函数内的this指是event.target
- 事件代理
    - 如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上。
    - 如果有多个子节点点触发时有相似的反应，那么子节点需要注册事件的话应该注册在父节点上。
```js
    // for： an A tag with the classA CSS class:
    // Get the parent DIV, add click listener...
document.getElementById("myDiv").addEventListener("click",function(e) {
    // e.target was the clicked element
    // The Element.matches() method returns true if the element would be selected by the specified selector string; otherwise, returns false. 
    // css选择器
  if (e.target && e.target.matches("a.classA")) {
      // event.target && event.target.nodeName == "A" && event.target.classList.contains("myClass")
    console.log("Anchor element clicked!");
	}
});
```

- 练习

    - 问题：有一个需求，有html，father，son，grandson4个元素，他们的关系如英文名，但是只有son上面装载着必要的信息id，而son是个表单组建比如输入框，需要实现一个功能是当我在输入框里输入完后，打印出是哪个组件且它父组件的id；
    - 实现：