# sessionStorage

- 存储在 sessionStorage 里面的数据在页面会话结束时会被清除，页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- 在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话，这点和 session cookies 的运行方式不同。

```js
    // 保存数据到sessionStorage
sessionStorage.setItem('key', 'value');

// 从sessionStorage获取数据
var data = sessionStorage.getItem('key');

// 从sessionStorage删除保存的数据
sessionStorage.removeItem('key');

// 从sessionStorage删除所有保存的数据
sessionStorage.clear();
```
- 返回值。一个 Storage 对象。

## Storage对象

[webAPI Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

[Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)

## IndexDB

- 简单描述： 和mysql类似的以key：value方式存储的web浏览器中的数据库

- 参考链接：

    [Basic_Concepts_Behind_IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB)

    [Using_IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
