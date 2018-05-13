# JS中的私有变量

当项目需要保护一些在运行时不应该被改变的数据(包括变量，函数，参数等等)时，我们就应该创建私有变量。但是JavaScript并不像C语言一样有修饰符来控制访问，并且所有属性都要在函数中定义。下面有几种在JavaScript中创建私有变量的方法。

## 一. 无法真正阻止变量被访问或修改
### 1. 命名约定

使用特定的命名约定表示属性应该视为私有。通常以下划线作为属性名称的前缀（例如 _count ）。这并没有真正阻止变量被访问或修改，而是依赖于开发者之间的相互理解，认为这个变量应该被视为限制访问。

```js
//原文示例
    class Shape{
        constructor(width, height) {
            this._width = width;//私有变量
            this._height = height;//私有变量
  }
```
### 2. WeakMap

[WeakMap 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
使用 WeakMap 来存储所有私有值，将私有值与用户可操作的对象分开。这种技术的好处是在遍历属性时或者在执行 JSON.stringify 时不会展示出实例的私有属性，但它依赖于一个放在类外面的可以访问和操作的 WeakMap 变量。

```js
//原文示例
const map = new WeakMap();
// 创建一个在每个实例中存储私有变量的对象
const internal = obj => {
  if (!map.has(obj)) {
    map.set(obj, {});
  }
  return map.get(obj);
}
class Shape{
  constructor(width, height) {
    internal(this).width = width;
    internal(this).height = height;
  }
  get area() {
    return internal(this).width * internal(this).height;
  }
}
const square = new Shape(10, 10);
console.log(square.area); // 100
console.log(map.get(square));// { height: 100, width: 100 }
```


### 3.Symbol

Symbol()函数会返回symbol类型的值，[symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 是一种基本数据类型 （primitive data type）。

用Symbol创建私有变量的方法和作用和weakMap很相似，但写法有差异，需要为每个私有属性创建一个 Symbol。
```js
//原文示例
    var SymbolWidth =  Symbol('width');
    var SymbolHeight = Symbol('height');
    class Shape{
        constructor(width,height){
            this[SymbolWidth] = width;
            this[SymbolHeight] = height;
        }
    get area() {
    returnthis[widthSymbol] * this[heightSymbol];
  }
}
const square = new Shape(10, 10);
console.log(square.area); // 100
console.log(square.widthSymbol);// undefined
console.log(square[widthSymbol]); // 10
```
## 二.阻止变量被访问或修改 
### 4. 闭包

闭包是将数据封装在调用时创建的函数作用域内，但是只从内部返回函数的结果，从而使这一作用域无法从外部访问。可以将闭包与 WeakMap 或 Symbol 一起使用。

```js
//理解用：
    function bibao(){
       const this$ = {};//所有私有变量组成的对象
       class Shape{
        constructor(width,height){
           this$.width = width;
           this$.height = height;
       }
       get area(){
           return this$.width*this$.height;
       }
    }   
 }
 //原文示例

 function Shape() {
  // 私有变量集
  const this$ = {};

  class Shape{
    constructor(width, height) {
      this$.width = width;
      this$.height = height;

      Object.defineProperty(this, 'area', {
        get: function() {
          return this$.width * this$.height;
        }
      });
    }
  }

  return Object.setPrototypeOf(new Shape(...arguments), this);
}
const square = new Shape(10, 10);
console.log(square.area);         // 100
console.log(square.width);            // undefined
console.log(square instanceof Shape); // true
```

### 5. Proxy

[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。它将允许你有效地将对象包装在名为 Proxy 的对象中，并拦截与该对象的所有交互。创建 Proxy 时，你将提供两个参数，第一个是您打算包裹的实例，第二个是您定义的希望拦截不同方法的 “处理器” 对象。

```js
//原文示例:
class Shape{
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  get area() {
    return this._width * this._height;
  }
}
const handler = {
  get: function(target, key) {
    if (key[0] === '_') {
      throw newError('Attempt to access private property');
    } elseif (key === 'toJSON') {
      const obj = {};
      for (const key in target) {
        if (key[0] !== '_') {
          obj[key] = target[key];
        }
      }
      return() => obj;
    }
    return target[key];
  },
  set: function(target, key, value) {
    if (key[0] === '_') {
      throw newError('Attempt to access private property');
    }
    target[key] = value;
  },
  getOwnPropertyDescriptor(target, key) {
    const desc = Object.getOwnPropertyDescriptor(target, key);
    if (key[0] === '_') {
      desc.enumerable = false;
    }
    return desc;
  }
}
const square = new Proxy(new Shape(10, 10), handler);
console.log(square.area);// 100
console.log(square instanceof Shape); // true
console.log(JSON.stringify(square));  // "{}"
for (const key in square) {           // No output
console.log(key);
}
square._width = 200; // 错误：试图访问私有属性
```


详情请戳[JavaScript 中的私有变量](http://mp.weixin.qq.com/s/8yyI1bB8eYu3-fCoDJM4Og)