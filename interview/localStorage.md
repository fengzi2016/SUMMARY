# localStorage

存储无限制，除非手动清除，大小4KM。

应注意无论数据存储在 localStorage 还是 sessionStorage ，它们都特定于页面的协议。

- 创建
```js
    localStorage.setItem('myCat','Tom');
```
- 读取
```js
    let cat = localStorage.getItem('myCat');
```
- 移除
```js
    localStorage.removeItem('myCat');
```
- 移除所有
```js
    localStorage.clear();
```