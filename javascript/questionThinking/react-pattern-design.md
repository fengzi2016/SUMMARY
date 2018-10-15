# React 设计模式与最佳实践

1. 多个条件渲染,将渲染逻辑抽成函数或者get 

```js
    canRenderXXX() {
        return this.props.x && this.props.y || this.props.z
    }
    render() {
        return (
            {this.canRenderXXX() && <XXX />}
        )
    }
```
2. 函数式编程
- JS是一等对象，可以做参数，可以被返回，可以添加属性；将函数传入函数再返回函数，被成为高阶函数。
- 纯粹性，纯函数内不应该有Math.random，Date()等不能确定的数据类型，其每次返回结果都是一样的。
- 不可变性，纯函数参数不能被改变，只能赋给新的变量再返回。
- 柯里化，将多参数函数转化为单参数函数，这些单函数的返回值也是函数，比如
```js
    const add = (x,y) => x+y;
    const keLiAdd = x => y => x+y;
    //返回了一个以y为参数的函数
    const add1 = keLiAdd(1);
    add1(2) //3
    add1(3) //4
```
 >这种函数写法相当方便，因为传入第一个参数后，第一个值被保留起来，返回的第二个函数
可以多次复用。
- 组合，函数可以结合成新函数，从而提高更高级的功能和属性

```js
    const add = (x,y) = x+y;
    const square = x => x*x;
    //组合
    const addAndSquare = (x,y) => square((add(x,y)))
```

2. 幂等函数，即传入相同的应用状态时会返回同样的 UI
3. 无状态函数
- 例子
    ```js
        //第一个参数为props，第二个为表示上下文的context
        const Button = (props,context) => (
            <button>{props.vale}{context.currency}</button>
        )
    ```
 - 区别。
    无状态组件与状态组件的一项区别在于，this在无状态组件的执行过程中不指向组件本身，由于这个原因，与组件实例相关的setState等方法以及生命周期方法都无法使用。
- ref 与事件处理器
    ```js
        () => {
            let input
            const onClick = () => input.focus()
            return (
                <div>
                    <input ref={el=>(input=el)}
                     />
                    <button onClick={onClick}>Focus</button>
                </div>
            )
        }
    ```
- 没有组件引用
    无状态式组件的另一个不同点在于，无论何时使用ReactTestUtils来渲染它们，都无法取回对组件的引用。
    ```js
        const Button = () => <button />
        const componet = ReactTestUtils.renderIntoDocument(<Button />)
        // 此时component 为null

    ```
    **一种解决方法**
    ```js
        const component = ReactTestUtils.renderIntoDocument(<div><Button /></div>)
    ```
4. 渲染方法
```js
   // 错误做法:添加了一次不必要的重新渲染
   componentDidMount() {
       this.setState({
           request:API.get(...)
       })
   }
   componentWillUnmount() {
       this.state.request.abort()
   }
   // 正确做法，将请求保存为组件实例的私有成员
   componentDidMount() {
       this.request = API.get(...)
   }
   componentWillUnmount() {
       this.request.absort()
   }
```
![pic](http://m.qpic.cn/psb?/V13Sdu2D3uI4IT/uSF5Ftr*S.9xqm0QuX5e2G3xrGOtQrsKPf6BBO64wPQ!/b/dDcBAAAAAAAA&bo=egINAgAAAAADB1U!&rf=viewer_4)

- 工具
    - react-docgen 生成文档工具