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
    //处理DOM的class添加
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
    //处理DOM的data- 各种属性
    export function getData(el,name,val){
        const prefix = 'data-';
        name = prefix + name;
        if (val) {
            return el.setAttribute(name,val);
        } else {
            return el.getAttribute(name);
        }
    }
```
```js
//更简单的写法
const addClass = (dom,name) => {
    dom.classList.add(name);
}
const removeClass = (dom,name) => {
    dom.classList.remove(name);
}
const hasClass = (dom,name) => {
    return dom.classList.contains(name);
}
```

## 构造出类封装代码。
### 作用：直接处理从服务器返回的数据，使得这个类里的数据可以直接应用到Dom对象渲染，减少代码量
例子：
```js
    //common文件夹里
    export default class Singer {
        constructor({id,name}){
            this.id = id;
            this.name = name;
        }
    }
    //使用地方
    import Singer from './common/singer.js'
    let singer = new Singer({id,name});

```

## bind css
### 作用：绑定动态背景图片等css样式
```html
    <div  :style = "bgStyle"></div>
```
```js
    //this.baImage()返回了一个图片地址
    //1.
    computed:{
        bgStyle(){
            return `background-image:url(${this.bgImage()})`
        }
    }
    //给layer DOM动态添加一个滑动效果、
    this.$refs.layer.style['transform']=`translated3d(0,${translateY}px,0)`;
```
## 添加对css的浏览器前缀的js处理
根据浏览器的支持情况得到响应的css前缀                                                                         
```js
    //dom.js
    let elementStyle = document.createElement('div').style;
    //前缀只适合vue
    let vendor = (() => {
        let transformNames = {
            webkit: 'webkitTransform',
            Moz: 'MozTransform',
            O: 'OTransform',
            ms: 'msTransform',
            standard: 'transform'
        }
    })
    for(let key in transform){
        if(elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})()

export function prefixStyle(style) {
    if(vendor ===  false) {
        return false;
    }
    if(vender === 'standard') {
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

// xxx.vue
import {prefixStyle} from 'xxxx'
const transform = prefixStyle('transform')
this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
```


## vue

- 一般不在created等生命周期内写大量函数内容，而是把函数放在methods，再在生命周期函数内 调用this._xxx()
- 语义化代码：把返回的状态放在api/config中，比如如果正确的话是 ERR_OK，再import 进vue中，判断code是否为ERR_OK
- slot 标签放在 base 中的基本组件，slot的内容为其被引进的.vue的标签内部dom
- 监听窗口resize()事件可以保持slider随着窗口大小变化
- 语义化代码：一些不变的字符串要给它们赋给变量名，比如:const HOT_NAME = "热门"
- vue-lazy-load 懒加载插件
- 当然数据只是为了在多个方法中共享而不需要被vue监听时，应该放在created(){}中
    比如:
    ```js
        created(){
            this.touch={}
        }
    ```
- method等中公有方法放上面，私有方法放下面
- vue滑动进入和退出动画

    ```css

        .slide-enter-active,.slide-leave-active{
            transition:all 0.3s            
        }
        .slide-enter,.slide-leave-to {
            transform:translate3d(100%,0,0)
        }
 ``

store文件夹

- actions => 
- state => 组件和模块相关数据,底层数据
- getters => 数据映射,函数的集合，计算属性，根据state的不同值计算新的值,也可以是比较复杂的判断逻辑
- mutation-types => 修改动作的集合，通常定义成字符串常量
- mutations => 修改数据的逻辑
