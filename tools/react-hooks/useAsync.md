# useAsync

- 异步处理的 hooks

## 总结

- 当要判断是否渲染的时候可以用 useEffect 和 ref 的结合
- 利用 setTimeout 和 MAP 建立 cache，建立 cache 需要传入 data ,key 和 cacheTime，data 记录了缓存数据，定时器，以及定时器开始时间

## 利用的 hooks

- useMountedState
  - 通过 ref.current 和 useEffect 来判断是否渲染
  - 利用 useCallback 缓存返回值函数
- useAsyncFn
  - 传入请求函数 fn，依赖项列表 deps，状态初始值 initialState
  - 利用 useRef(0).current 的变化来创建和记录当前请求函数的 id
  - 利用 callback 来缓存和优化调用函数的更新
  - 请求的 promise 要保证当前请求 id 等于 ref.current 并且页面已经渲染
- useAsync
  - 利用 useEffect 来保证已经渲染
