## 书籍重点记录

### 中间件
1. 什么都不做的中间件代码
```js
 function doNothingMiddleware({dispatch, getState}) {
   return function(next){
     return function (action){
       return next(action);
     }
   }
 }
```
  **以action为参数的函数需要拥有以下功能**
  - 调用dispatch 派发出一个新action对象
  - 调用getState获取当前Redux Store上的状态
  - 调用next 告诉Redux当前中间件工作完毕
  - 访问action对象action上的所有数据

2. redux-thunk的原理
```js
  function createThunkMiddleware(extraArgument) {
    return ({dispatch, getState}) => next => action => {
      if( typeof action === 'function' ) {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    }
  }
  const thunk = createThunkMiddleware();
  export default thunk;
```
