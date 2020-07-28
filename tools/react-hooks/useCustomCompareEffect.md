# useCustomCompareEffect

由于 useEffect 里依赖的对象如果是引用类型会导致每次进入 useEffect 时依赖项都更新了（与原来的引用不同），所以需要利用 自己喜欢的函数(customCompare)作为第三个参数 来比较引用类型到底有没有改变，如果没有改变，则依赖项没变，或者说没有依赖项。

## 思路

- 利用 useRef 来承接 deps
- 利用 自己提供的比较函数 来判断引用类型有没有变，变了就用 ref 来代替 deps，没变则依赖项为空

# useDeepCompareEffect

这个 hooks 只是更加便捷的提供了 deepEqual 函数来比较引用类型
