>数据流向的改变通常是通过用户交互行为或浏览器行为（如路由跳转）触发的，当此类行为会改变数据的时候，可以通过 **dispatch**发起一个action ，如果同步行为会直接通过 **Reducers** 改变 **State**, 如果是异步行为（副作用）会先触发 **Effects** 然后流向 **Reducers** 最终改变 **State**

## 总结：

1. 分为用户交互行为和浏览器行为
2. 分为同步和异步行为
3. 最终都是改变state
4. 异步比同保护多一个Effects容器
5. 触发的操作都是通过 dispatch

## - Models
```js
import React from 'react';
import dva,{connect} from 'dva';
import './style.css';

// 1. Initialize
const app = dva();

// 2. Model
app.model({
    namespace:'count',
    state:0,
    reducers:{
        add (count) {return count+1},
        minus (count) {return count-1}
    } 
});

class TestError extends React.Component {
    componentDidCatch(e) {
        alert(e.message);
    }
    componentDidMount() {
        // throw new Error('a');
    }
    render() {
        return <div>TestError</div>
    }
}

// 3. View
const App = connect(({count})) => ({
    count
})(function(props){
    return(
        <div>
            <TestError />
            <h1>{props.count}</h1>
            <button key='add' onClick={()=>{props.dispath({type:'count/add'})}}> +</button>
        </div>
    )
})
// 4. Router
app.router(()=><App />)
// 5. start
app.start('#root')
```