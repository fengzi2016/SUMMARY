# 关于浅拷贝和深拷贝
ps：这个问题很多人都总结过，我的总结只不过是我自己的沉淀而不是需要广而告之的一种教程，所以不是很深或者很全，也不会渐进式引导。

**首先，浅拷贝和深拷贝这两个概念只是有索引要求的那些复杂数据类型的两种拷贝方法，比如object,array等，而对于string,number这些简单的数据类型则只有深拷贝这个概念，即拷贝了一个全新的对象,任意一个改变不会相互影响，**

    如 let a = 5;let b = a;a = 6;console.log(b)//=>5

## 浅拷贝
 - 含义： 对于object,array这种需要索引的数据类型来说，浅拷贝是只复制了数据的属性，但是前后两者用的是同一个存储空间，所以不管改变拷贝的数据内容还是被拷贝的数据内容，互相都会产生影响。
    
        如let a={a:1,b:1}; let b=a; a.a=2; console.log(b.a)//=>2
 - 如何拷贝是浅拷贝？

    1. 直接赋值 a=b
    2. array.slice() 
    3. array.concat()
    4. Underscore 里的 _.clone(object)
    5. lodash里的_.clone(object)
    6. jQuery里的$.extend({},...}

    *应该还有 待续。。。。*
  
## 深拷贝
 - 含义：深拷贝则是不仅复制了这些数据的属性，还开辟了一个新的空间给新对象。则改变其中任意一个不会影响另一个。
    
        let a={a:1,b:1}; let b=_.cloneDeep(a); a.a=2; console.log(b.a)//=>1
- 如何拷贝是深拷贝？

 1. JSON 全局对象的 parse
 2. JSON 全局对象的 stringify

 **ps:**

    function jsonClone(obj) {

        return JSON.parse(JSON.stringify(obj));
    }
    var clone = jsonClone({ a:1 });

 3. lodash 里的.clone(object,true) 
 4. lodash 里的 _.cloneDeep(object)
 5. jQuery里的$.clone()【 对DOM 对象】
 6. jQuery里的$.extend(true,{},x)

  *应该还有 待续。。。。*

 [阅读详情](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)