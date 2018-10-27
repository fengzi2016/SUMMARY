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

- children 

当给组件传入单个子元素时，如:
```js
    <Button>
        <span>Cilck me</span>
    </Button>
```
会出现以下提示：

>Failed prop type: Invalid prop `children` of type `object` supplied
to `Button`, expected `array`.

这是因为组件只有单个子元素时，出于性能方面的考虑,React 会优化元素的创建过程，避免分配数组。
解决方法：
```js
 Button.propTypes = {
     children:React.PropTypes.oneOfType([
         React.PropTypes.array,
         React.propTypes.element,
     ])
 }
```
- 容器组件和表现组件
    - 容器组件
        - 例子
        ```js
            class XxxContainer extends Component {
                render(){
                    return <Xxx {...this.state,...this.props} />
                }
            }
        ```
        - 特点：
            - 更关心行为部分；
            - 负责渲染对应的表现组件；
            - 发起API请求并操作数据
            - 定义事件处理器
            - 写作类的形式
    - 表现组件
        - 例子，纯函数：
        ```js
           const Xxx = (props,context) =>{
               return (
                   <div>{props.name}</div>
               )
           }
           Xxx.propTypes = {
               name:React.PropTypes.string
           }
        ```
    - 特点：
        - 更关心视觉表现
        - 负责渲染HTML标记和其它组件
        - 以props的形式从父组件接收数据
        - 通常写作无状态函数式组件

- 组合一切
    - Mixin（不推荐）：当组件之间需要共享功能时的做法
        - 注意：mixin只能与createClass 工厂方式搭配使用，当使用类是不能运用minxin,而react的核心概念是 声明式，createClass其实是命令式。
        - mixin通常是对象字面量，和组件拥有同样的方法和属性例子:

        ```js
            const WindowResize = {
                getInitialState() {
                    //初始化state,固定的生命周期
                    return {
                        innerWidth:window.innerWidth
                    }

                },
                ComponentDidMount() {
                    window.addEventListener('resize',this.hanleResize);
                },
                ComponentWillUnMount() {
                    window.removeEventListener('resize',this.hanleResize);
                }
                hanleResize() {
                    this.setState({
                        innerWidth:window.innerWidth
                    })
                }
            }
            // 应用mixin
            const MyComponent = React.createClass({
                mixins:[WindowResize],
                render(){
                    console.log('window.innerWidth:',this.state.innerWidth)
                }
            })
        ```
        - mixin的生命周期方法和初始状态可以和使用它的组件合并，重复的生命周期会按顺序执行，重复的state会被覆盖
        - 缺陷：1. 高耦合，难以维护，当一个mixin发生改变，所有用了它的组件都会做出改变。2. 生命周期和状态发生冲突，或者对于组件来说是引入了不必要的状态。
    
    - 高阶组件
    - 函数子组件
    - context
    - recompose
    - render props
    - children
    
- 工具
    - react-docgen 生成文档工具
    - react-storybook 按照组件自身的代码来构建一套视觉展示库
    - radium 解决react行内样式无法定义伪类和媒体查询等问题
    - react-addons-css-transition-group 可以帮助我们声明式地创建动画
    - react-css-modules 将css模块化，使得在javascript中引用时更规范
    - styled-components css工具，支持伪类，支持媒体查询
