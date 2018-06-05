# 有赞面试

## 没有回答好的题目：


1. JavaSript 作用域
2. MYSQL 索引
3. 修改this的方法
4. https 密钥
5. 服务器端如何存储cookie
6. vue的虚拟DOM树
7. koa和express 的区别，koa轻量级在哪里

## JS基础篇
- [you don't know javascript](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20%26%20going/ch1.md)

- [eloquent javascript](https://eloquentjavascript.net/)

- [javacript ninja](https://www.manning.com/books/secrets-of-the-javascript-ninja)


1. 作用域

- JavaScirpt 有 **全局作用域，函数作用域，eval作用域**，**没有块作用域**，

- 函数作用域：一个函数中的任何位置定义的变量在该函数中的任何地方都是可见的。

- 块作用域：任何一对花括号中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。

- 如何让JS模拟出块级作用域：

    把语句块放到一个闭包之中，然后调用这个函数，当函数调用完毕，变量自动销毁，相当于给这个闭包加了一个函数作用域，因此，我们在块外便无法访问了。
    例子：
```js
    
    function grid(){
        (function() {
           var i = 1;
        })();

        console.log(i);
        //ReferenceError: i is not defined
    }
    grid();
    //弹出i未定义的错误
```
-  JavaScript 采用的是词法作用域即静态作用域，函数的作用域在函数定义的时候就决定了。而动态作用域的意思是，函数作用域在执行的时候才决定。