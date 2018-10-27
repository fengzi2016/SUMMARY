# 防抖动函数

## 思路

防抖动有两种思路：

- 一种是延长函数触发的时间，
- 另一种是如果函数一直是持续触发，直到函数不持续触发时触发函数。

在loash中有2个方法用来实现防抖动

- 节流阀 throttle：固定时间周期内调用

```js
    // loash源码：
     _.debounce = function(func, wait, immediate) {
        var timeout, result;
        // timeout计时器，result为func调用结果
   
    var later = function(context, args) {
        // later函数用来调用传入的参数并且重置timeout
        // 重置timeout为null
      timeout = null;
      // 如果函数有参数，则调用函数
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
        // 如果timeout已经指向了一个计时器，则清除这个计时器
      if (timeout) clearTimeout(timeout);
      // 如果是立即执行
      if (immediate) {
          // 如果没有计时器，则callNow为true
        var callNow = !timeout;
        //设置计时器
        timeout = setTimeout(later, wait);
        // 如果之前没有计时器则立即调用函数
        if (callNow) result = func.apply(this, args);
      } else {
          //如果不是立即执行则 设置计时器延迟执行
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
        // 清除计时器
      clearTimeout(timeout);
      timeout = null;
    };
    // 返回了一个函数
    return debounced;
  };

  // 模仿源码写一个自己的debounce
  function debounce() {

  }

```


- 防抖动 Debounce：只在最后调用一次
```js
    _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };
```