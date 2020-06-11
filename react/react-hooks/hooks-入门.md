# React hooks 入门
## hooks介绍
1. 不用class来管理状态
2. 使得组件逻辑被复用
## hooks 概览
1. 向下兼容
2. useState函数中的state在函数被调用时都是独立的，函数的唯一参数是state的初始值，同一个组件可以多次使用useState
3. useEffect 指在组件在每次渲染之后的操作，其可以通过返回一个函数来指定如何“清除”副作用
4. Hook的使用规则： 1. 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。 2. 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。
5. Hooks可以用于复用状态逻辑，它不复用 state 本身。
6. useContext 让你不使用组件嵌套就可以订阅 React 的 Context。
```js
function Demo() {
    const local = useContext(localContext);
}
```
7. 另外 useReducer 可以让你通过 reducer 来管理组件本地的复杂 state。
```js
 function toDos() {
     const [ todos, dispatch ] = useReducer(todoReducer);
 }
```

