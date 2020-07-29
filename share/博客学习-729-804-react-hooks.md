# 博客学习

## react 类组件

react 类组件中，this 是可变的，所以每次拿到的都是组件实例的最新的 state 和 props。为了让组件内的函数能够捕获当时渲染所需要的 state，需要把 props 以及 state 利用闭包单独定义，然而这样类就没有存在的意义，因此可以用函数组件替换。

```js
class ProfilePage extends React.Component {
  render() {
    // Capture the props!
    const props = this.props;

    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert("Followed " + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

## react 函数组件

- react 函数组件会捕获渲染所用的值，useState 创建出来的 state 利用了闭包，虽然每次 useEffect 都是新的函数，但是 useEffect 里函数利用的 state 都是触发某次新渲染时的 state，而不是最新的 state。
- 如果需要拿到最新的 state 或 props，可以利用 useRef，因为它是渲染帧中共享的可变变量。通常情况下，应该避免在渲染期间读取或者设置 refs，因为它们是可变的。下面这种写法可以使得 ref 始终追踪到最新的值。

```js
const [message, setMessage] = useState("");

// 保持追踪最新的值。
const latestMessage = useRef("");
useEffect(() => {
  latestMessage.current = message;
});
```

## 依赖项类型为引用类型的解决方法

### 1. 基本类型

正常

### 2. 函数类型

#### 方法一，将函数的依赖项直接作为 useEffect 的依赖项

可以将函数用 useCallback 包裹（A），也可以将函数提到整个函数组件之外（B）。

```ts
// B
const fetchProduct = async (productId) => {
  const response = await fetch("http://myapi/product" + productId); // Uses productId prop
  const json = await response.json();
  return json;
};

function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  // A
  //   const fetchProduct = useCallback(async (productId) => {
  //     const response = await fetch('http://myapi/product' + productId); // Uses productId prop
  //     const json = await response.json()
  //     setProduct(json)
  //   }, [])

  useEffect(() => {
    fetchProduct(productId).then((json) => {
      setProduct(json);
    });
  }, [productId]);
  // ...
}
```

#### 方法二，封装 hooks

利用各种依赖比较是语义相同而不是地址相同的 hook。比如，react-use-that 的 useStableCallback hook

### 3. 数据对象（不包括函数）

### 方法一，分解为基本类型

```ts
export default () => {

     const [state, setState] = useState({
         foo: 0,
         bar: 1,
     })

    const foo = state.foo
    useEffect(() => {
        ...do something with foo...
    }, [foo])

    ...
}
```

### 方法二，利用封装的 hooks

可以通过 react-use-that 的 useSemantic hook 让数据对象的值和引用保持一致。
