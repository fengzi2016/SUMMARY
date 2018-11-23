# 懒执行
[参考链接](https://www.404forest.com/2016/08/15/%E4%BD%BF%E7%94%A8%20requestAnimationFrame%20%E5%AE%9E%E7%8E%B0%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E4%B8%8E%E6%87%92%E6%89%A7%E8%A1%8C/)

- requestAnimationFrame 的执行时机是在页面重绘之前
- 思路：递归调用，如果用循环的话只是把所有的调用堆到最后。
```js
    $(function(){
    var lazyLoadList = [A,B,C,D];
    var load = function() {
      var module = lazyLoadList.shift();
      // shift删除数组第一个元素并且返回此元素，不是纯函数，原数组被改变
      if(module) {
        new module();
        window.requestAnimationFrame(load); //写个递归
      }
    }
    window.requestAnimationFrame(load);
})
```
- 测试
```js
    function module(time) {   //构建耗时函数
        var startTime = Date.now();
        while(Date.now() - startTime < time){}
    }
    var lazyLoadList = [
    function(){
        module(20);
    },function(){
        module(15);
    },function(){
        module(10);
    },function(){
        module(10);
    },function(){
        module(16);
    },function(){
        module(5);
    },function(){
        module(15);
    },function(){
        module(18);
    },function(){
        module(7);
    },function(){
        module(30);
    },function(){
        module(13);
    },function(){
        module(10);
    },function(){
        module(2);
    },function(){
        module(9);
    }
];
var load = function() {
    var module = lazyLoadList.shift();
    if(module) {
        module();
        window.requestAnimationFrame(load); //写个递归
    }else {
        return;
    }
};
window.requestAnimationFrame(load);
```