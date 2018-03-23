# Vue introduce

今天我来介绍一个用vue框架写的项目的形成，使用与部署。

## Vue是什么? 

我对它的初步理解是：一个以数据为驱动的，构造组件为核心思想的JS框架。

官方文档的介绍是这样说的：

> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

看了这一段话，很多名词我们可能都没见过，这里我们对一些生涩的词进行探索。

### 什么叫做渐进式框架？

意思就是 这个框架本身对开发者要求的规则比较少。
引用一个反例子：
> 每个框架都不可避免会有自己的一些特点，从而会对使用者有一定的要求，这些要求就是主张，主张有强有弱，它的强势程度会影响在业务开发中的使用方式。比如说，Angular，它两个版本都是强主张的，如果你用它，必须接受以下东西：- 必须使用它的模块机制- 必须使用它的依赖注入- 必须使用它的特殊形式定义组件（这一点每个视图框架都有，难以避免）所以Angular是带有比较强的排它性的，如果你的应用不是从头开始，而是要不断考虑是否跟其他东西集成，这些主张会带来一些困扰。  作者：徐飞
链接：https://www.zhihu.com/question/51907207/answer/136559185
来源：知乎 著作权归作者所有处

其实就是 它会给你很多选择，当你有更多需要的第三方库的时候再自己加。再来一个生动的例子就是：好比给你一个空屋，通了煤水电网，有床够睡，需要什么自己添；亦或给你拎包入住，但住了一阵子这不满意那不满意。vue就是前者。



### 什么是视图层？

说到视图层，这里就要先了解一下目前的前端开发的构架模式：MVVM 。

> MVVM是 Model-View-ViewModel的缩写。在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

其中View层就是视图层。在HTML5还没有风靡的时候，Web端的构架模式一般都是用JAVA的Model-View-Controller 即 模型-视图-控制器。其中
- View UI布局展示数据
- Model 管理数据
- Controller 响应用户操作，并将Model更新到View上

而这个框架慢慢被前端抛弃是因为有以下痛点：

- 大量相同DOM API被重复调用，操作冗余，降低渲染性能，加载速度
- Model 和 View层频繁发生变化都需要开发者用原生代码进行两层同步

而利用MVVM则可以通过ViewModel 进行双向数据绑定，开发者主要关心业务逻辑就行。

### 什么是单页应用？

> 单页Web应用（single page web application，SPA），就是只有一张Web页面的应用，是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。 ----百度百科

这样说可能还不是很清楚，我们拿传统页面和单页面做个对比：

传统页面:
![多页](https://wx3.sinaimg.cn/large/006P0MECly1fply93z3e6j30il0a074m.jpg)

单页应用：
 ![单页](https://wx2.sinaimg.cn/large/006P0MECly1fply93hicqj30jh05x74f.jpg)   


>单页应用的特点: 
>- **控制器前置**，单页应用将路由处理放在浏览器端，即在浏 览器端直接响应浏览器地址的变化，分发到对应的路由，向用户呈现对应的界面。
>- **以小块组件为功能元件**，类似于传统网页中的 Ajax 组件，单页应用以小的组件为功能元件，在路由变化时，不再刷新整个页面，而是组合这些小的组件，替换变化的部分。
>- **数据层前置**，与 Ajax 组件一个明显的区别是，单页应用在浏览器端通常有一层实实在在的数据层，而服务端则退化成了完全的数据 API。浏览器端的数据层会封装服务端 API，供上层的视图层调用。

现在我们组的很多项目就是单页应用，单页应用有这几个好处:
 
 - 无刷新体验
 - 完全的前端组件化
 - API共享
 - 组件共享

 如果想了解更多单页的，可以戳[这里](http://tinyambition.com/Single-Page-App-Break/%E7%AC%AC01%E7%AB%A0%20%E4%BD%95%E4%B8%BA%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8.html)


现在我们大概理解了Vue.js是什么以及它介绍中的一些扩展和特点，那么开始来了解它怎么使用。

在官方文档里面对它的各种方法有详尽的解释和例子，这里因为只是引入我解释一些常用的方法和API。

### 如何开始？
 - 如果你想使用Vue.js ，最简单的就是用js内联引入一个在线包
```js
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>

```
但是我们一般是工程化的项目，所以正常情况下是用 npm 下载它的库:

```
$ npm install vue
```
然后再用vue-cli脚手架，来创建你的vue项目。vue-cli可用于快速搭建大型单页应用，该工具为现代化的前端开发工作流提供了开箱即用的构建配置。
```node
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm run dev
```

### vue这个库提供了什么给我们？

我之前也没有详细分析到底Vue提供了什么，写这个教程进行分析后发现，其实还是很好理解的。

对于开发者来说，vue提供了一个Vue类，我们都知道，使用类之前都要进行实例化，Vue也不例外,而要当我们要利用vue开发时，需要给Vue传入一个参数，这个参数的数据类型是对象。下面创建了一个没有任何赋值的Vue实例，但是它本身应该有一些初始化属性和方法，这些可能要去看源码了解。
```js
    var vm = new Vue({})
```

那么一个Vue实例需要传入的参数需要什么属性呢？

比较常用的以下几个：

```js
    var vm = new Vue({
        el: '#example',//绑定的DOM元素
        data:{} //数据对象。数据改变时视图被重新渲染
        //生命周期：
        created: function () {
            // 表现：key: function
            // 表示一个实例被创建之后执行代码
            // `this` 指向 vm 实例
        }
        //还有mounted、updated 和 destroyed等等
        computed: {
             //表现： key:{...function}
            // 内部函数放在HTML标签上，每次初始或者更新时渲染到这个函数绑定到的DOM元素就会触发对应方法
           
            reversedMessage: function () {}
            //...
         }
        methods: {
            //表现：key:{...function}
            //内部函数放在HTML标签上,每次触发到某个被绑定的DOM元素的某些事件就会触发对应方法
            reversedMessage: function () {}
        }
        watch: {
             //表现:key:{...function}
             //当某些数据随着其它数据变化时需要用到watch
             //想监听哪个数据，则函数名词与data对象中的属性名相同
                keyName: function () {},
        }


    })

```

这是一个vue实例最基本的几个使用方法和API，下面我们学习一下HTML的模板语法：

```html
    <span>Message: {{ msg }}</span> 
    <!--msg是data中设置的数据，这里就将数据直接和HTML相结合-->
    <!-- 也可以用 JavaScript 表达式 -->
     <span>{{ number + 1 }}</span>

```

在vue.js的模板语法中，最常见的还是v- 指令，比如
```html
    <div v-bind:id="dynamicId"></div>
```
指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。也就是说页面上凡是需要动态响应的数据和事件都需要用v- 指令将其与vue实例绑定。

所以上面这个例子的意思是说： div的id属性值是 vue实例中 data中 dynamicId属性的值，而如果你想改变ID，只需要在vue实例中做一些修改就能同步改变这个DOM 的id。

比较常用的指令有：
-  v-bind: ，缩写":" ,它的值一般是data数据和computed里的函数，或者当有父子组件中的数据传递时的props；:后面接的可以是dom的原有属性，也可以是自定义名称
- v-on:，缩写"@",它的值一般是methods里的方法；@后面接的一般是dom的监听事件比如click，当有父子组件中的事件传递时则是自定义事件名
- v-html ,将数据直接转化为DOM的html，这个时候数据一般是 字符串类型的标签值
- v-for,当数据是数组时，会对数据进行遍历
- v-if ,决定DOM元素是否存在
- v-show,决定DOM元素会展现，即使不展现会占位
- v-model,经常在input表单出现，v-model的值就是表单的值

现在我们知道了HTML和JS是如何联系的，但是Vue如何控制CSS呢？

在处理CSS的时候，如果一个DOM的样式在某段时间或者会因为某个事件发生变化，则应该先在CSS文件中定义多个样式和对应选择器，再通过以下方式进行样式切换

```html
    <div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
    </div>
```
其中 active和text-danger是class，isActive和hasError是data中的属性值，一般情况下是布尔值。

以上介绍了vue的基本用法，比较高级和详细的用法在官方文档里更详细，我就不再说了。

### 一个用webpack打包，用ninja做脚手架的vue.js项目目录

![vue](https://wx2.sinaimg.cn/large/006P0MECly1fpm1j0mv7wj308g0g7jrj.jpg)


下面对各个文件夹进行解释：
- build和config ：webpack配置文件
- mock:虚拟数据和路由定义
- server:部署到服务器上后的服务器代码
- src:vue业务逻辑代码，静态文件，图片等
- template:放置渲染结果的ejs和html容器，最后所有的js都被引入里面对应的html




实际在开发时因为业务逻辑比较多，我们经常把每个组件分开来写，再用export default暴露出来，再通过import进行组件的组合，也就是组件化与模块化一起使用。
所以 真正在写项目的时候，一个.vue文件应该是这样的：
```html
<!-- 只允许有一个根容器，这里是第一个div -->
<template>
     <div> 
        <he></he>
        <div >xxx</div>
   </div>
</template>

<script>
import header from "./header.vue";
import footer from "./footer.vue";
import show from "./show.vue";
import Cookie from "cookie";
// 几个公共处理文件或者库
import marked from "mark";
import API from "api";
import pattern from "dateFormatter";
//export default暴露这个组件
export default {
  data() {
    return {
      id: 0,
      share: {
        type: Object
      },
      items: [],
      isAuthor: false
    };
  },
// 引入其它组件 ，其它组件内部和这个例子一样
  components: {
    he: header,
    foot: footer,
    show: show
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.share.share || "", { sanitize: false });
    }
  },
  mounted() {
    var api = window.location.pathname;
    this.id = api.split("/")[2]; //把 id props 给子组件
    API.getView(this.id).then(value => {
      this.share = value.shares;
      this.items = value.comments;
      if (this.share.username === Cookie.getCookie("username")) {
        this.isAuthor = true;
      }
    });
  },
  methods: {
    fetchComments() {
      API.getView(this.id).then(res => {
        this.items = res.comments;
      });
    },
  
  }
};
</script>

<!-- css -->
<style lang="scss" module>
html {
  position: absolute;
  right: 10vw;
  top: 7vh;
  width: fit-content;
}

}
</style>
```
其中像 < he >这个标签就是我们自己定义的组件，之后被import进来，组合使用，是不是觉得很自由？之后我们也可以命名标签了噢！

要使得vue项目能用webpack打包，有一个loader（处理器）不得不提，即 vue-loader。

我们可以看出，.vue文件内部是html,css,javascript的组合，为什么浏览器可以运行.vue文件呢？vue-loader起了很大作用。

vue-loader 是一个 webpack 的 loader，可以将上面那个例子的 Vue 组件转换为 JavaScript 模块，即:

> Vue组件默认分成三部分，< template >、< script > 和 < style >，我们可以把一个组件要有的html，js，css写在一个组件文件中，而vue-loader，会帮助我们去处理这个vue组件，把其中的html，js，css分别编译处理，最终打包成一个模块。

比如在上面那个例子中，vue-loader会告诉webpack要用scss-loader来处理style，用html-loader来处理template。

**而vue-loader是怎么实现的呢？**

 > loader本质就是接收字符串(或者buffer)，再返回处理完的字符串(或者buffer)的过程。webpack会将加载的资源作为参数传入loader方法，交于loader处理，再返回。

如果想自己实现一个loader,相关教程可以看官方文档["编写一个loader"](https://doc.webpack-china.org/contribute/writing-a-loader)

在真实的项目中，我们经常会遇到各种数据或者说状态在不同组件中传递，这个时候我们就需要了解一些数据传递的方法和API。

先理解什么是父子组件，举个栗子：
```html
    <!-- 在app.vue里 -->
    <father></father>


    <!-- 在father.vue里 -->
    <template>
        <div>
            <son></son>
        </div>
    </template>


    <!-- 在son.vue里 -->
    <template>
        <div>
            <grandson></grandson>
        </div>
    </template>

```

在这个例子中有father,son,grandson三种关系。

父传子：
如果father组件想传递数据给son，则在son的vue实例中添加一个**props**属性，承接father的属性值。举个例子：
```html
    <!-- 在father.vue中 -->
    <!-- data是在father组件中设置的 -->
    <son data = "x"></son>
   
    <!-- 在son.vue中 -->
    <script>
        export default {
           
            props:["data"] //如果是my-message ，则应该改成myMessage
             data: function () {
             return { counter: this.data }
            }
            //将父组件传过来的属性值 赋给子组件的局部属性count
        },
    </script>

    <!-- 如果你觉得data会动态变化则需要动态绑定 -->
    <son v-bind:data = "parentMsg"></son>
   
```


子传父：利用Vue 的自定义事件系统，每个 Vue 实例都实现了事件接口，即：

- 使用 $on(eventName) 监听事件

- 使用 $emit(eventName, optionalPayload) 触发事件

```html
    <div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```

```js
    Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment') //emit（冒泡）触发父组件监听的increment方法
    }
  },
})

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```


非父子间数据或事件传输
```js
 //new 一个新的vue实例
var bus = new Vue()
// 触发组件 A 中的事件，第二个参数为触发的事件需要的参数，1就是id
bus.$emit('id-selected', 1)
// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
```


现在大多数基础会用到的基本介绍完毕，官方文档对高级一点的使用有非常详尽的教程和例子。

## 最后总结一个原则: 凡是会动态变化的，都应该v-on,或者v-bind；除了特殊情况不允许在vue里面用JS直接操作HTML DOM，一定是数据驱动视图的。
