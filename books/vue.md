# vue源码解析笔记
1. 将数据变成可观察
  - 响应式原理依赖：Object.defineProperty,所以vue不支持IE8以及更低版本浏览器
  - vue通过设定对象属性的setter/getter方法来监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图（在set方法里调用回调函数）
  - 通过proxy代理使得数据扁平化，比如需要app._data.text才能触发的set，代理之后用app.text就行
  - [代码链接](https://github.com/answershuto/learnVue/blob/master/docs/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.MarkDown)
  2. 依赖收集
  - 1. 收集类Dep，类的内部在构造函数内初始化存储对象，并且提供添加元素，删除元素，触发元素回调等方法
  - 2. 订阅者类Watcher，类的内部在构造函数内将参数进行映射存储，将观察者本身赋予给全局的target，只有被target标记过的才会进行依赖收集。
  - 3. 有Dep.target的对象会将Watcher的实例push到subs中，在对象被修改出发setter操作的时候dep会调用subs中的Watcher实例的update方法进行渲染。

- [代码链接](https://github.com/answershuto/learnVue/blob/master/docs/%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.MarkDown)

3. 抽象DOM树
- vnode
  - 节点标签名， 子节点， 节点对象，文本，对应的真实dom节点，名字空间，编译作用域，函数化组件作用域，key，组件的option选项，节点对应的组件的实例，当前节点的父节点，原生html，静态节点标志，是否作为根节点插入，是否为注释节点，是否为克隆节点，是否有v-once指令
- createElement用来创建一个虚拟节点。当data上已经绑定__ob__的时候，代表该对象已经被Oberver过了，所以创建一个空节点。tag不存在的时候同样创建一个空节点。当tag不是一个String类型的时候代表tag是一个组件的构造类，直接用new VNode创建。当tag是String类型的时候，如果是保留标签，则用new VNode创建一个VNode实例，如果在vm的option的components找得到该tag，代表这是一个组件，否则统一用new VNode创建。

