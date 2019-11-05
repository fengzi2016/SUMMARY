# 电商项目
- vue 如果要设置深层嵌套的state需要用this.$set 或者 Vue.set 或者把它放在data下做属性 或者forceUpdate，否则不能刷新
- ios上用img会展示不出来所以最好用div background
- 如果用了webpack，当需要引入的静态资源设置不会变webpack编译时就会出现相对路径寻找失败的问题，解决方法是将相对路径改成 require('xxx')
- 用了flex 最好就保持一致
- grid 有兼容问题，目前支持度不佳
- 要多些注释，多换行