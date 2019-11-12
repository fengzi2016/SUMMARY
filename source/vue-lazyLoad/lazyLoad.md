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