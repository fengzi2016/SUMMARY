# Vue的问题
## 1. vue 解决了什么问题
vue解决了原生DOM需要多次调用一些复杂的API，频繁更改DOM的问题

vue将视图层分离出来，让开发者解开视图和数据的耦合，形成组件化开发的思维，提高了开发效率和减少了维护成本

## 2. MVVM
M: model 数据 比如vue里的data

V: view 视图 比如vue里的template

VM: 初始化vue里的各种属性，方法，生命周期等等

vue的VM利用了数据劫持，Angular的VM利用了脏数据检测