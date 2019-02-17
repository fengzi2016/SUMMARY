# vue源码解析笔记
1. 将数据变成可观察
  - 响应式原理依赖：Object.defineProperty,所以vue不支持IE8以及更低版本浏览器
  - vue通过设定对象属性的setter/getter方法来监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图（在set方法里调用回调函数）
  - 通过proxy代理使得数据扁平化，比如需要app._data.text才能触发的set，代理之后用app.text就行
  - [代码链接](https://github.com/answershuto/learnVue/blob/master/docs/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.MarkDown)
  2. 依赖收集
  