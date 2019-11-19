# Vue lazyLoad 
## Vue.use(plugin,options)
- Vue源码中将Vue类构造器作为参数传给外部插件
- Vue.use的核心代码为args添加Vue构造器，并且在use函数中调用install 方法 plugin.install.apply(plugin, args);
- 插件的通过接收参数对Vue类进行修改，包括
```js
MyPlugin.install = function(Vue, options){
    Vue.myGlobalMethod = function(){}
    Vue.directive("my-directive",{
        bind(el,binding,vnode,oldVnode)
    })
    Vue.mixin({
        created: function(){}
    })
    Vue.prototype.$myMethod = function(){}
}
```

- 判断元素相交
```js
var options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: '0px',
    threshold: 1.0
}
var target = document.querySelector("#listItem");
observer.observe(target);
```

- customEvent Plofill
```js
const CustomEvent = (function() {
    if(!typeof window !== 'undefined') return;
    if(typeof window.CustomEvent === 'function') return window.CustomEvent;
    function CustomEvent(event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined}
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    return CustomEvent
})
```


- 获取某个元素的属性
```js
const style = (el, prop) => {
    return typeof getComputedStyle !== 'undefined' ?
    getComputedStyle(el, null).getPropertyValue(prop) :
    el.style[prop] 
}
```
## ReactiveListener
1. 概括：初始化某个Lazy.el即Img的加载情况以及各种属性
2. 主要功能：

    1. 属性：初始化，销毁，更新一个图片元素的属性，父元素
    2. 加载和渲染img：过滤src，提前加载loading图片，根据图片加载状态切换加载图片，缓存，根据位置判断加载时机
    3. 其他：更新加载后的属性

## Lazy
1. 概括： 初始化事件监听，管理用户传入的参数，缓存图片
2. 主要功能：
    1. 1个Lazy指令管理多个ReactiveListener，初始化，更新，删除特定的ReactiveListener
    2. Lazy指令与元素的绑定
    3. 判断加载时机，设置加载回调
    4. 根据指令参数更新加载路由
    5. 根据加载状态触发加载回调
## lazyContainer
管理Lazy，绑定Lazy和图片的父元素
## lazyContainerManager
管理LazyContainer，包括绑定，更新，解绑
## 利用的数据存储点
- dataset
- Vue directive的binding属性