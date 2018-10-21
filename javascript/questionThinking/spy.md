**题目**：
    > 国家有重要的任务要托付给你：完成间谍函数 spy，它可以潜伏到任何一个函数当中，监听它们的所有活动。spy 接受一个函数作为参数，返回一个被间谍潜伏以后的函数。

**例子：**
```js
let america = (a, b) => a + b

america = spy(america)
america(1, 2) // => 3
spy 返回的函数和原来的函数的功能一样，但是它悄悄记录了每一次执行的参数和执行结果，都存放到一个 calls 数组里面：

america(1, 2)
america(3, 4)

america.calls[0].args // => [1, 2]
america.calls[0].result // => 3

america.calls[1].args // => [3, 4]
america.calls[1].result // => 7
```
**思路**:

- 首先，这个函数会返回一个对象A，A拥有calls这个属性，且calls是一个对象数组，每个元素有2个属性，args和result。args是参数fn的参数arguments，result是参数fn的调用：fn.apply(this,arguments)。

- 第二，对象A可以被调用，且可以记录每次调用的参数和结果。因此可以得出对象A是一个函数，并且函数内有一个记忆型变量B进行记录。

- 第三，这个记忆型变量B从一开始传入初始参数fn时就应该被生成，并且需要被长久得保存，并且不断累积记录。

**疑问**
- 当一个函数C的参数为函数D并且返回一个函数E时，如何获得函数D的参数呢？
    - 解答： 应该在函数C中生成一个函数F，这个函数F就是返回的函数E，并且它也是调用函数C后的函数D的转话体，函数F的参数就是函数D的参数。

**答案**
```js
    function spy (fn) {
        let calls = [];
        const helper = function() {
            const obj = {
                args:[...arguments] //用于承接函数D的参数
                result:fn.apply(this,arguments)
            }
            calls.push(obj);
            return obj.result;
        }
        helper.calls = calls;
        return helper; //只有第一次调用spy返回helper,之后都是调用helper，再执行helper里的操作，所以需要长久保存的calls在spy函数里

    }
```

- **注意**

 因为用了fn.apply(this,arguments),所以题目中的函数不能用箭头函数，因为在非严格模式下，this都指向window