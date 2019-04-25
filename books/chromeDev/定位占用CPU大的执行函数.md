## 执行性能
### 问题
如果发现某个函数运行时间过长，占用CPU过多，比如出现内存泄漏，那么如何找到这个函数呢
### 定位
- 打开chrome dev （右键->检查）
- 选择 JavaScript Profiler
- 选择 Record Javascript CPU Profile
- 点击 Start 从结果可以找出占用cpu最多的函数
### 解决方法
- 对于动画，避免使用setTimeout和setInterval, 而应该使用requestAnimationA ni ma ti o n FAnimationFrame
- 将长时间运行的Javascript从主线程转移到Web Worker
- 使用微任务来执行对多个帧的DOM更改
- 使用Chrome Dev Tool 的TimeLine 和Javascript 分析器来评估Javascript影响

[文档参考](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution?hl=zh-cn)
[devtools参考](https://www.html.cn/doc/chrome-devtools/rendering-tools/js-execution/)