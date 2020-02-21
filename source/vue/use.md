# Vue.use
## 架构
- 制定plugin.install为plugin启动函数的规则
- initUse将Vue类传入，函数体内：
- Vue.use将plugin传入
- 在已经加载过的plugin里寻找是否已经存在
- 如果存在直接返回
- 如果不存在则将Vue类传入参数的首部
- plugin.install.apply(plugin, args)
- 如果没有install则直接调用plugin.apply(null, args)
- 再将plugin 放入到已经加载的记录数组中
- return Vue 类
