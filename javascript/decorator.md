# es6装饰器
1. 基本用法
```js
    @decorator
    class TestClass {}
    function decorator(target){
        target.go = true;
    }
    // TestClass.go = true;

```
2. 如果觉得参数不够用
```js
    function test(isTable){
        return function(target){
            target.isTable = isTable;
        }
    }
    @test(true)
    class Test{}
    @test(false)
    class Test2
    // Test.isTable = true;
    // Test.isTable = false;
```
3. 装饰器的实质
```js
    @decorator
    class A{}
    // 等同于
    class A{}
    A = decorator(A)|| A

```
4. 装饰器的应用

- react 和 redux
```js
    class MyReactComponent extends React.Component {}

    export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
    // 用装饰器改写
    @ connect(mapStateToProps, mapDispatchToProps)
    export default class MyReactComponent extends React.Component {}
```
