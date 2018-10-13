问题：实现一个函数sum(1,2)(3).valueOf() => 6

思路：
> 首先这是个函数，调用了valueOf方法。每个JS对象都有内置的valueOf方法，不同的对象调用的原理不一样，这个方法可以被重写。Obejct,Number和函数是先调用valueOf，如果没有返回字符型结果就调用toString方法，如果还是没有返回字符型结果则为undefined；String是先调用toString再调用valueOf,直到返回字符型结果为止，否则为Undefined
> 所以题目函数的valueOf应该被重写了，返回了一个字符型结果，即总和
> sum可以不停的调用，说明是返回了一个函数
> 最后的和是所有参数的和，说明主函数内有变量对参数进行了积累（递归积累）,

```js
    function sum() {
        let args = Array.prototype.slice.call(arguments); // 积累参数
        function help() {
            let _args = Array.prototype.slice.call(arguments);
            return sum.apply(null,args.concat(_args)); // 不断递归
        }
        help.valueOf = function() {
            return args.reduce((a,b)=>{
                return a+b;
            },0)
        }
        return help;
    }
```

```js
    function sum() {
        let result = 0;
        for(let i=0;i<arguments.length;i++) {
            result+=arguments[i];
        }
        function foo() {
            for(let j=0;j<arguments.length;j++) {
                result+=arguments[j];
            }
            return foo;
        }
        foo.valueOf=function(){
            return result;
        }
        return foo;
    }
```