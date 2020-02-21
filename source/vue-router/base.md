# Base
## 整体架构
- Base 基本的history类
- 根据mode分为：‘hash’，‘history’，‘abstract’三种不同的history子类，并且new 出不同类的实例
- 每个history子类都实现了父类定义的方法包括
  - go，去某一次浏览记录
  - push，将某个path推入到history中
  - replace，将某个path把当前path代替
  - ensureURL，确保path可用
  - getCurrentLocation，返回当前的path
 
## History
- 依次调用不同生命周期的监听的回调函数
- 使用场景：同步=>当有要依次调用的函数,每个函数产生一个函数数组，，数组里的每个函数调用完后要调用同样的回调函数，并且在调用完所有的函数后需要调用一个结束回调函数
```js
  const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated),
      // global before hooks
      this.router.beforeHooks,
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      resolveAsyncComponents(activated)
    )

    // 其中hook 就是queue[i], next 就是递归runQueue下一个i++
     const iterator = (hook: NavigationGuard, next) => {
      if (this.pending !== route) {
        return abort()
      }
      try {
        hook(route, current, (to: any) => {
          if (to === false || isError(to)) {
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort()
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }

    // 递归调用
    function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
      const step = index => {
        if (index >= queue.length) {
          cb()
        } else {
          if (queue[index]) {
            fn(queue[index], () => {
              step(index + 1)
            })
          } else {
            step(index + 1)
          }
        }
      }
      step(0)
    }


  // 开始调用

    runQueue(queue, iterator, () => {
      const postEnterCbs = []
      const isValid = () => this.current === route
      // wait until async components are resolved before
      // extracting in-component enter guards
      const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
      const queue = enterGuards.concat(this.router.resolveHooks)
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort()
        }
        this.pending = null
        onComplete(route)
        if (this.router.app) {
          this.router.app.$nextTick(() => {
            postEnterCbs.forEach(cb => {
              cb()
            })
          })
        }
      })
    })
```
## Match
- 根据name，path进行Map，用了递归
- routeRecord记录了一个路由的大多数属性
- 用pathList来记录所有的path

