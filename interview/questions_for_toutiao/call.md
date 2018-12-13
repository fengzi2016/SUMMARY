# Function.prototype.call(this[,arg1,arg2...])

- **function.prototype.call(this)** 主要是将调用函数**function**的**this**指针指向参数**this**。
- 作用：
    - 这样做可以让某个对象调用另一个对象的方法。
    - 也可以帮助实现构造式继承。
    - 使用call方法调用匿名函数，即匿名函数.call(obj,args)
    - 使用call方法调用函数并且指定上下文的'this'
    - 使用call方法调用函数并且没有确定第一个参数（argument）
        - 非严格模式：this的值指向全局对象。
        - 严格模式：this的值为undefined
- 如果this参数为null或undefined
    - 非严格模式下则对象为window。
    ```js
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    function Bao(name){
        Product.call(undefined,name);
        // null也是一样的到window上
    }
    console.log(new Bao('1').name);//"undefined"
    console.log(window.name); //"1"
    ```
    - 严格模式下
    ```js
    Error: Cannot set property 'name' of undefined
    // null 类似
    ```
- **返回值**：返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined。

- **实现**
```js
    Function.prototype.call2 = function (context) {
    var newcontext = context || window;
    // this 为调用call的function
    newcontext.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    // 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]

    var result = eval('context.fn(' + args +')');

    delete newcontext.fn
    return result;
}
```