# react todo list review questions
## JZQ

### 总体框架:
1. 逻辑：

    父组件Todolist 控制数据源，并且处理所有交互事件。

    子组件todoitem 负责其内部UI，并且通过状态提升转移事件处理给父组件。

    子组件addnew 负责其内部UI，并且通过状态提升转移事件处理给父组件。

2. 可能会出现的问题

- 子组件被挂载上许多为了状态提升而设置的属性.如：
```html
    <Todoitem todo={item} 
        CompleteTask = {this.CompleteTask.bind(this)} 
        DeleteTask = {this.DeleteTask.bind(this)}
        Edit = {this.Edit.bind(this)} 
        EditTask = {this.EditTask.bind(this)}
    />
```
这可能会导致：
 
 - 父组件处理了很多的子组件数据流的逻辑
 - 可读性差

- 需要做的优化
    - 尽量在子组件内部把逻辑处理完，将最后的结果传递给父组件
    - 对子组件的事件进行封装，使得属性和处理变成一个属性的参数。

    

### 实际问题

**1.  .bind**
```js
// 8 , 9
 this.additem = this.additem.bind(this);
 this.enteradd = this.enteradd.bind(this);

```
为什么要 bind (this)，如果不bind 会怎样，还有什么其它写法吗？

**answer:**
#### 一。
1. 如果你不绑定this，那么在事件发生并且精确调用这个方法时，方法内部的this会丢失指向

2. 这不是React的原因，这是JavaScript中本来就有的。如果你传递一个函数名给一个变量，然后通过在变量后加括号()来调用这个方法，此时方法内部的this的指向就会丢失

在JSX的代码中，
```js
 onClick = {this.additem}
```
这里的this.additem函数被赋给了 onClick ，我们把onClick当作一个变量，进行如下类似的测试：

```js
    let obj = {
        tmp:'Yes!',
        testLog:function(){
            console.log(this.tmp);
        }
    };
    obj.testLog();//'Yes!'
    
    let tmpLog = obj.testLog;

    //即将这个函数赋给了tmpLog,tempLog指向一个函数，对应以下情况中的As a function，即非严格模式下，this指向window ,严格模式下为undefined
    //window.tmp === undefined
    
    tmpLog();//undefined
```

#### 考察知识点 ：**this**

*当创建或者调用函数时，有2个固定对象类型的参数被传入，arguments和this。*

一般情况下当不同调用时 **this** 的指向

- As a function,this == 严格模式：undefined,普通模式：window.
- As a method of a object, this == the object.
- As a constructor , this == the newly constructed object
- with call and apply , this == the first parameter 

几种特殊情况：箭头函数和bind方法：
- 箭头函数没有自己的this ，所以如果它是在函数里被创建的，它的this指的是这个函数，但如果它在对象里被创建的，并且被赋值给对象的一个属性，则它的this 在普通模式下是window, 在严格模式下是undefined.
- 用bind方法可以创建一个新的有一样内容的函数，并且this一定是这个新函数。

 **二 其它写法**
```js
    //似乎更简洁
    onClick = {this.additem.bind(this)}
    //如果有参数
    onClick = {this.additem.bind(this,...args)}
```

**2. ref**

todoitem.js:

```html
    <!-- 54,55 -->
     <input type="text" ref="new" className={edit} placeholder={item.text} onKeyUp = {this.enter} />
```
这里为什么要用ref？什么时候应该使用ref？如果不用ref该如何写？

#### 官网说明:

1. 使用场景
    - 处理焦点，文本选择或媒体控制
    - 触发强制动画
    - 集成第三方DOM库

2. 注意点

- 不要过度使用 Refs
- 可以用状态提升来代替，即使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。

3. 如果只是为了同步input的值，应该将input写成受控组件，例子：
```js
    class InputDemo extends React.Componet {
        constructor(props) {
            super(props);
            this.state = {value:''};
        }
        handleChange(event) {
            this.setState({value:event.target.value});
        }
        render() {
            return (
                <form>
                    <input type = "text" value = {this.state.value} onChange = {this.handleChange.bind(this)} />
                </form>
            )
        }
    }
```

3. 格式问题

- 命名未遵循驼峰格式
- 需了解一下自定义属性何时用handle- ，何时用on- 
