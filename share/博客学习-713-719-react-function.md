# 博客学习

在过去的一个星期里主要探讨了 react hooks 里的 react 内置 hooks，以及 react-use 库里的一些自定义 hooks。

## 总结

### react hooks

1. useEffect:异步，做一些和 dom 操作无关的且是在 DOM 渲染之后需要完成的操作，但是如果它的依赖是引用类型，则每次判断依赖的时候都是新的对象，所以每次都会执行，那么如何优化呢，这时 react-use 提出了 useCustomCompareEffect 和 useDeepCompareEffect 来让引用类型的依赖对象每次根据对象内容而不是对象地址来评价是否更新。这两个 hooks 的原理就是利用 ref 来保存上一次的依赖，在 effect 运行时判断前后依赖是否内容相同，如果相同则依赖为空，则不相同则用将新的依赖赋给 ref，代替之前的依赖。状态改变 ->react render -> 屏幕渲染 -> useEffect
2. useLayoutEffect: 它是一个跟 DOM 操作有关的 hooks，一般情况下如果需要在 hooks 里面同步操作 DOM 或者获取 DOM 当时的尺寸位置相关的信息需要用到它，但是由于它会阻塞 Dom 的渲染所以最好少用。状态改变 -> react render -> useEffectLayout -> 屏幕渲染。当某个行为会触发某个 state 的变更并且这个变更和 effect 里的这个 state 的变更不同时且会影响 DOM 时，就需要用到 useLayoutEffect。
3. useRef：它创建的 ref 可以贯穿组件的整个生命周期，不管其他的 hooks 怎么变，它永远都是同一个对象，需要程序员手动更新。很多人都用 ref 来承接一些需要在多个函数运行时或者说执行队列里根据特殊情况变化的变量。
4. useCallback：它返回了一个根据某些依赖项变化的缓存了的函数，它也用作包裹一些需要传给子组件的 props 属性包括函数或者对象或数组（引用类型），因为这样每次父组件因为其他 state 的更改而重新渲染的时候，子组件不会因为是这个 props 属性是引用类型而得到一个新的函数而导致重新渲染。如果 useCallback 的依赖项是引用类型，依旧不会重复运行，而是因为依赖项是浅比较。
5. useMemo： 返回的是结果，其他和 useCallback 类似。

```ts
const { useState, useRef, useEffect, useCallback, useMemo } = React;

function Father() {
  const [name, setName] = useState("push");
  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <>
      <input value={name} onChange={handleChange} />
      <Form name={name} />
    </>
  );
}
function Form(props) {
  const [text, updateText] = useState("");
  const textRef = useRef();
  // dep没变 不会重复渲染
  const dep = useMemo(() => {
    a: 1;
  });

  // dep没变 会重复渲染
  // const dep = {a: 1}

  const a = useMemo(
    (dep) => {
      console.log("into");
      return dep;
    },
    [dep]
  );

  useEffect(() => {
    textRef.current = text;
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current;
  }, [dep]);

  return (
    <>
      <input value={text} onChange={(e) => updateText(e.target.value)} />
      <button onClick={handleSubmit}>{props.name}</button>
    </>
  );
}
ReactDOM.render(<Father />, document.body);
```

6. useReducer，当某个 state 有比较复杂或者说分支比较多的变化时，可以用 useReducer 来集合处理变化，从而使得变化的条件和结果更清晰。当需要用到 setState 的函数形式比如 setCount(prevCount => prevCount+1)时就要考虑用 useReducer，react 会保证 dispatch 在组件的生命周期内保持不变，在 useEffect 里面调用 dispatch 可以让 react 记住当时需要发送什么状态改变的动作，而不需要把状态引入到 effect 中作为依赖项，并且 dispatch 也不需要作为依赖项，因为它永远不变。比如：

```ts
const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === "tick") {
    return { count: count + step, step };
  } else if (action.type === "step") {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: "tick" }); // Instead of setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

7. useImperativeHandle，如果父组件创建了 ref ，将 ref 挂载在子组件上，则子组件可以将这个 ref 作为 useImperativeHandle 第一个参数，从而让父组件的 ref 和子组件内部的 ref 相关联，并且可以用第二个参数决定给父组件暴露哪些内部 ref 的 current 属性。

```ts
function FancyInput(props, ref) {
  const inputRef = React.createRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} />;
}

FancyInput = React.forwardRef(FancyInput);

// You can now get a ref directly to the DOM button:
const fancyInputRef = React.createRef();
<FancyInput ref={fancyInputRef}>Click me!</FancyInput>;

// fancyInputRef.current.focus() === inputRef.current.focus()
```

8. useContext：为了让某些状态不通过多层次的 props 进行传递，一般是传输一个包含不同属性组合的对象，在子组件选择相应的属性。但是还有一种思想是将 context 设置为一种 state，通过传输一个 setState 的函数，这样就可以根据进入不同的子组件来更改 context 的内容。

```ts
//father.tsx
function Father() {
  const RContext = createContext((arg: RenderComponentCf) => {
    /* */
  });
  const showComponentConfig: RenderComponentCf = {
    hasHeader: true,
    hasSlider: true,
  };
  const [renderCmpConfig, setRenderCmpConfig] = useState<RenderComponentCf>(
    showComponentConfig
  );
  function changeShowCmpConfig(config: RenderComponentCf) {
        setRenderCmpConfig(config);
  }

    return     <RContext.Provider value={changeShowCmpConfig}>
    <Child >
     </RContext.Provider>
}

// Child.tsx
import { RContext } from '~components/frame';



function Child() {
    const setCmpShowConfig = useContext(RContext);

    function setConfig(setCmpShowConfig: (arg: RenderComponentCf) => void, config: RenderComponentCf) {
      setCmpShowConfig(config);
    }

    function hiddenHeaderAndSlider(callback: (arg: RenderComponentCf) => void) {
      setConfig(callback, hiddenHeaderAndSliderConfig);
    }
    const hiddenHeaderAndSliderConfig: RenderComponentCf = {
      hasSlider: false,
      hasHeader: false
    };

    useEffect(() => {
        hiddenHeaderAndSlider(setCmpShowConfig);
    }, []);


}

```

9. 一般建议把不依赖 props 和 state 的函数提到你的组件外面，并且把那些仅被 effect 使用的函数放到 effect 里面。如果这样做了以后，你的 effect 还是需要用到组件内的函数（包括通过 props 传进来的函数），可以在定义它们的地方用 useCallback 包一层。为什么要这样做呢？因为这些函数可以访问到 props 和 state，因此它们会参与到数据流中。

10. 如果某个 effect 中调用了某个函数，并且函数依赖了某个组件的状态，那么这个函数应该成为 effect 的依赖项，为了优化最好将函数用 useCallback 包裹一层。
