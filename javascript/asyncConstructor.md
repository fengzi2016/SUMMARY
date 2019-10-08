# 异步构造函数 - 类
## 遇到的场景
- 希望能够在一个类里对某些数据进行单例操作
## 异步构造的方法
### 为什么构造函数不可以await
因为构造函数需要返回一个对象，而async /await | promise只能返回一个承诺
### 1. init 方法解决
- 通过回调函数的方法，在类的某个向外暴露的方法里对数据进行操作
```js
    class MyClass {
        constructor() {

        }
        async init(callback) {
            const data = await fetch();
            callback.bind(this)(data);
        }
    }

    var instance = new MyClass();
    instance.init(() => {

    })
```

### 2. 利用静态方法
```js
    class MyClass {
        constructor(async_param) {
            if(typeof async_param === 'undefined') {
                throw new Error('Cannot be called directly');
            }
        }
         static async build () {
            var async_result = await doSomeAsyncStuff();
            return new MyClass(async_result);
        }
    }
    MyClass.build().then(function(myObj) {
        // myObj is returned by the promise, 
        // not by the constructor
        // or builder
    });
    async function foo () {
        var myObj = await MyClass.build();
    }

```
### 3. 利用自定义事件
先挂载事件监听，当数据加载好之后，利用事件触发进行处理