# react lifecycle


## 生命周期
- 初始化阶段
  - defaultProps
  - constructor
  - componentWillMount
    - 此处setState无意义，应该放在state 中
  - render
  - componentWillDidmount
    - 此处setState会导致组件又render一次,一般只有需要拿到组件的位置和高宽的时候才会用
- 运行中阶段
  - 新生命周期，在初始化和更新的时候都会调用，用来替代componentWillReceiveProps
   **getDerivedStateFromProps(props,state)**。命名的意思是当一个组件被创建和props被更新的时候会调用
  - **getSnapshotBeforeUpdate(prevProps, prevState)**能够捕获到一次突变，经常在要拿到实时的dom的位置和大小要用
  - componentWillReceiveProps
    - 应该setState，不会造成重复render
  - shouldComponentUpdate
    - 禁止调用setState
  - componentWillUpdate
    - 禁止调用setState
  - componentDidUpdate
    - 除非用了判断否则造成循环
- 销毁阶段
  - componentWillUnmount
    - 执行setState无意义，不会生效
## react-lifecycle-methods-diagram

current 

![当前](http://a1.qpic.cn/psb?/V13Sdu2D3uI4IT/yMPa95WX3kRZxW3M38mOHdwzPx4NeQXAOcoVz7BsInc!/m/dEgBAAAAAAAAnull&bo=wAY4BAAAAAADB9g!&rf=photolist&t=5)


[Reference links](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)