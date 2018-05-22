# 今日头条笔试总结

## 难题 

1. date处理时间戳
2. class实现eventEmit的on off once trigger
3. 正则表达式实现匹配字符串
4. bind,this
5. 原码补码反码
6. 实现array
7. 保证ajax拉取的数据在用户点击按钮前能获取到

### 1. date时间戳
1. 日期转化为时间戳
```js
    let  time = '2014-04-23 18:55:49:123'
    let date  = new Date(time);
    console.log(Date.parse(time))
    console.log(Date.parse(date))
    console.log(date.valueOf())
    console.log(date.getTime())
```
特点：  
1. 必须将日期字符串转化成Date实例才能调用valueOf()，getTime()方法
2. Date.parse()方法可以传字符串也可以传Date实例

### 2. class 实现EventEmit

```js
    class EventEmit {
        constructor() {
            this._events = {};
        }
        on(event,callback) {
             // 获取之前存储的其它回调函数，没有则为空数组
            let callbacks = this._events[event] || [];
            // 将新回调函数加入函数数组
            callbacks.push(callback);
            // 将数组作为类的私有变量_events的属性名为event的属性值
            this._events[event] = callbacks;
            // 将类返回
            return this;
        }
        off(event,callback) {
            let callbacks = this._events[event] || [];
            callbacks = callbacks && callbacks.filter((fn)=> fn!=callback);
            this._events[event] = callbacks;
            return this;
        }
        emit(...args) {
            let event = args[0];
              //取 args 这个数组中的从下标1到最后的元素赋给数组[]
            let callbacks = this._events[event];
            let params = [].slice.call(args,1);
            callbacks.forEach(fn => fn.apply(this,params));
            return this;
        }
        once(event,callback) {
            let wrapFunc = (...args) => {
                callback.apply(this,args);
                this.off(event,wrapFunc);
            }
            this.on(event,wrapFunc);
            return this;
        }
    }

```
### 3.学习正则表达式


刷题练习

