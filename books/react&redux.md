## 书籍重点记录

### 中间件
1. 什么都不做的中间件代码
```js
 function doNothingMiddleWare({dispatch, getState}) {
   return function(next){
     return function (action){
       return next(action);
     }
   }
 }
```