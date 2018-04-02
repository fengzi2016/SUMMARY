# 学习vue-music的总结

## 架构
文件夹: stylus
- index.styl

```js
    import "./rest.styl"
    import "./base.styl"
    import "./icon.styl"
```
- base.styl //基本样式
- icon.styl //按钮样式
- mixin.styl //函数样式
- reset.styl //重置浏览器默认样式
- variable.styl //变量样式

文件夹api 

config.js //放置公共路由参数
```js
    export const commonParams{

    }
```

## 封装jsonp

```js
    import originJSONP from 'jsonp'
    export default 
    function jsonp(url,data,option){
        url += (url.indexOf('?')<0?"?":"&")+param(data)

        return new Promise((resolve,reject)=>[
            originJSONP(url,option,(err,data)=>{
                if(!err) {
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        ])
    }
   function param(data){
       let url =''
       for(var k in data){
           let value = data[k]!==undefined?data[k]:''
           url += `&${k}=${encodeURLComponent(value)}`
       }
       //encodeURLComponent 对URL中的标点符号进行编码
       return url?url.substring(1):''
   }
```

## 某些移动端有用的库
- babel-runtime es6转译es5 //不需要import
- fastclick 移动端300ms延迟
- babel-ployfill babel补丁，es6API转译 
## 封装dom.js 添加class
```js
    export function addClass(el,className){
        if(hasClass(el,className)) return;
        let newClass = el.className.split(" ")
         newClass.push(className);
        el.className = newClass.join(" ")
    }
    export function hasClass(el,className){
        let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
        return reg.test(el.className)
    }
```

## vue

- 一般不在created等生命周期内写大量函数内容，而是把函数放在methods，再在生命周期函数内 调用this._xxx()
- 语义化代码：把返回的状态放在api/config中，比如如果正确的话是 ERR_OK，再import 进vue中，判断code是否为ERR_OK
- slot 标签放在 base 中的基本组件，slot的内容为其被引进的.vue的标签内部dom
- 监听窗口resize()事件可以保持slider随着窗口大小变化