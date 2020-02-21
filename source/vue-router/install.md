# VueRouter.install
## 架构
- 1. 如果已经installed并且Vue已经被实例化则直接返回
- 2. 利用Vue.mixin在beforeCreate生命周期时进行router初始化和挂载包括_routerRoot, _router, this._router.init(this)
- 3. 利用Vue.util.defineReactive将 this._router.history.current挂载到组件实例的_route属性上，并且是双向绑定
- 4. 再用registerRouteInstance将Vue实例注册到matched.instances[name]里面，registerRouteInstance这个函数在RouterView中定义和初始化
- 5. 定义Vue全局的$router对象 指向 this._routerRoot._router【VueRouter类】
- 6. 定义Vue全局的$route对象，指向this._routerRoot._route【Route类】
- 7. 定义RouterView组件和RouterLink组件