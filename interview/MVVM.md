# MVVM
## MVC
[MVC](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020106.png)

Controller 非常薄，只起到路由的作用，而 View 非常厚，业务逻辑都部署在 View。所以，Backbone 索性取消了 Controller，只保留一个 Router（路由器） 。
**例子**
用MVC模式通过koa实现了后端数据、模板页面和控制器的分离，

>   
- 所有通信都是单向的。
- 视图（View）：用户界面。
- 控制器（Controller）：业务逻辑
- 模型（Model）：数据保存
## MVP
[MVP](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020109.png)

1. 各部分之间的通信，都是双向的。

2. View 与 Model 不发生联系，都通过 Presenter 传递。

3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

## MVVM
[MVVM](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png)
状态的同步，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。


## Angular 脏数据检测

[脏数据](https://www.cnblogs.com/likeFlyingFish/p/6183630.html)
[Angular 1 深度解析：脏数据检查与 angular 性能优化](https://segmentfault.com/a/1190000010433675)
- 只有当UI事件，ajax请求或者 timeout 延迟事件，才会触发脏检查。
- 双向数据绑定，一个绑定表达式只要放在当前 DOM 树里就会被监视，不管它是否可见，不管它是否被放在另一个 Tab 里，更不管它是否与用户操作相关。

## vue数据双向绑定

[数据动态绑定的简单实现——基于ES5对象的getter/setter机制](https://zhuanlan.zhihu.com/p/25003235)
- 类之间的关系

![图像](http://a1.qpic.cn/psb?/V13Sdu2D3uI4IT/kBwM.AXNzOgphsGsXw3p*Pu*pWBo8x76gSLWplPVXWo!/c/dFQBAAAAAAAA&ek=1&kp=1&pt=0&bo=FAUKBAAAAAADFy0!&tl=1&vuin=1820166258&tm=1542430800&sce=60-2-2&rf=0-0)
- 过程：
    - 初始化Vue类，_init函数，添加属性，el，data，options，methods
    - 给类添加方法，利用Object.defineProperty , get/set来监听变化，_parseFunc，_parseData，并且在_init中调用
    - _parseData用于如果不是基础数据类型遍历子属性，_parseFunc用于解析行内js函数
    - 引入Directive（指令），Directive的作用就是建立一个DOM节点和对应数据的映射关系，用以解决以下问题：
        - 修改未绑定至DOM的数据时，也会引发DOM的重新渲染。
        - 修改某个数据会导致所有DOM重新渲染，而非只更新数据变动了的相关DOM 。
        ```js
        
         function Directive(name,el,vm,exp,attr){
            this.name=name;         //指令名称，例如文本节点，该值设为"text"
            this.el=el;             //指令对应的DOM元素
            this.vm=vm;             //指令所属Lue实例
            this.exp=exp;           //指令对应的值，本例如"count"
            this.attr=attr;         //绑定的属性值，本例为"innerHTML"

            this.update();          //首次绑定时更新
        }
        Directive.prototype.update=function(){
            //更新DOM节点的预设属性值
            this.el[this.attr]=this.vm.$data[this.exp];
        };
        ```
    - 如何让数据对象的setter在触发时，调用与之相关的directive？
        - 在实例化时建立一个_binding对象，在_init函数中添加 this._binding={}
        ```js
            this._binding={
                count:{
                    _directives:[]          //该数据对象的相关指令数组
                }
            }

            set:function(newVal){
                console.log(`更新${newVal}`);
                if(val!==newVal){
                    val=newVal;
                    //遍历该数据对象的directive并依次调用update
                    binding._directives.forEach(function(item){
                        item.update();
                    })
                }
            }
        ```
        - 实现双向绑定的最后一步，就是编译带有v-model、v-click与v-bind指令的DOM节点。
    - Proxy解决Object.defineProperty的问题：
        1. 只能对属性进行数据劫持，所以需要深度遍历整个对象
        2. 对于数组不能监听到数据的变化
    - 总结：整个体系搭建并不复杂，只需要注意其中三个核心的部分：getter/setter，Directive以及binding。细心的读者不难发现，在本文的实现中，如果线程频繁触发数据变更，会导致DOM频繁更新，非常影响性能。在真正的生产环境中，DOM的更新不是数据变更后立马更新，而是被加入到批处理队列，等待主线程运行完后再进行批处理。
