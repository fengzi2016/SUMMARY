# 你所不知的的JS
## 对象
- 用Object.create(null)创建的对象没有Object.prototype，而且不能调用Object的各种内置方法
- Object.keys() 和 Object.getOwnPropertyNames()只会查找对象直接包含的属性
- Object.seal(),Object.freeze(),configurable:false 作用差不多，都是禁止对象被修改
- eval() 和 with() , new Function, setTimeOut(arg1,arg2)会动态创建作用域。
- in 和 Object.hasOwnProperty的区别，in会查找prototype,而另一个不会。in 是查找对象的某个属性名是否存在，数组的属性名默认只有下标，除非后来设置了
- 对数组进行for...in 操作会出现数组可枚举的属性包括下标。（数组也是对象）
- get 和 set的写法
```js
 var obj = {
    get a() {
        return this.a;
    } 
    set a(x) {
        this.a = x;
    }
 }
```