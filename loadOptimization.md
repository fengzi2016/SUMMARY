# web加载优化

参考链接
1. [如何运用最新的技术提升网页速度和性能](http://web.jobbole.com/87686/)
2. [从零开始React服务器渲染](http://www.alloyteam.com/2017/01/react-from-scratch-server-render/)
3. [ReactDOMServer](http://www.css88.com/react/docs/react-dom-server.html)
4. [vue-lazy-component](https://github.com/xunleif2e/vue-lazy-component/blob/master/src/VueLazyComponent.vue)
1. **使用textarea标签包裹HTML/JS/CSS代码**, 当作textarea的value值, 在页面渲染的时候实际并没有渲染到DOM树上, 而是与图片懒加载类似, 当textarea标签出现或即将出现在用户视野时, 将textarea中的HTML代码取出, 用innerHTML动态插入到DOM树中, 如有必要使用正则取出js/css代码动态执行.
例子：

```html
     <div class="loading">
        <textarea class="datalazyload" style="visibility: hidden;">
            <style>.lazy {width: 300px; height: 168px; background: #333;}</style>
            <script>console.log('eval success');</script>
            <li class='lazy'></li>
        </textarea>
    </div>
    <div class="loading">
        <textarea class="datalazyload" style="visibility: hidden;">
            <style>.lazy {width: 300px; height: 168px; background: #444;}</style>
            <script>console.log('eval success');</script>
            <li class='lazy'></li>
        </textarea>
    </div>
```

2. **资源压缩**

步骤:
   - npm install compression
    ```js
        var compression = require('compression')
        var app = express();
        app.use(compression());
    ```

3. **图片压缩**，减小图片大小

推荐：“色彩笔压缩工具”

4. **懒加载**

-  图片懒加载
    实现原理：判断是否出现在屏幕可视区域，若出现则给img的src赋值并配以动画
    - 原生js懒加载
    ```js
    
        /*包裹结构 
        <image-containner>
            <img>
            <img>
             ...
         </image-containner>
        */
        function loadImg(domArr) {
            for(let i = 0; i<arr.length;i++){
                /*getBoundingClientRect() Returns a TextRectangle object. Each rectangle has four integer properties (top, left, right, and bottom) that represent a coordinate of the rectangle, in pixels.
                
                获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
                document.documentElement.clientHeight 在w3c标准下表示页面可见区域的高度
                */
                if(domArr[i].getBoundingClientRect().top<document.documentElement.clientHeight&&!domArr[i].isLoad){
                    domArr[i].isLoad = true;
                    (function(i){
                        setTimeout(function(
                            if(domArr[i].dataset) { 
                                /*兼容不支持data的浏览器*/
                                addSrc(domArr[i], domArr[i].dataset.imgurl);
                                } else {
                                addSrc(domArr[i], domArr[i].getAttribute("data-imgurl"));
                                }
                                domArr[i].style.cssText = "transition: 1s; opacity: 1;" 
                                /*动态效果*/
                            })(i);/*立即执行*/
                        ))
                    })
                }
            }
        function addSrc(obj, url) {
            var oImg = new Image();
            oImg.onload = function() {
             obj.src = oImg.src; /*下载完成后将该图片赋给目标obj目标对象*/
            }
            oImg.src = url; /*oImg对象先下载该图像*/
        }
        let Images =  document.getElementById("img-containner").getElementsByTagName("img");/*生成一个数组，每个元素都是img-containner里的img DOM*/
        loadImg(aImages);
        window.onscroll = function() { 
            /*滚动条滚动触发*/
            loadImg(aImages);
        };
   
    ```
    - vue.js图片懒加载

    原理：监听位置，控制是否加载。下面我们来研究vue-lazy-component 插件的源码
    ```html
        <vue-lazy-component
        @init="init"
        @beforeInit="beforeInit"
        >
        <!-- real component-->
        <st-series-sohu/>
        <!-- skeleton component -->
        <st-series-sohu-skeleton slot="skeleton"/>
        </vue-lazy-component>
    


        <template>
            <transition-group :tag="tagName" name="lazy-component" style="position: relative;"
            @before-enter="(el) => $emit('before-enter', el)"
            @before-leave="(el) => $emit('before-leave', el)"
            @after-enter="(el) => $emit('after-enter', el)"
            @after-leave="(el) => $emit('after-leave', el)">
            <div v-if="isInit" key="component">
              <slot :loading="loading"></slot>
            </div>
            <div v-else-if="$slots.skeleton" key="skeleton">
              <slot name="skeleton"></slot>
            </div>
            <div v-else key="loading">
            </div>
          </transition-group>
        </template>

    <script>
      export default {
        name: 'VueLazyComponent',

        props: {
          timeout: {
            type: Number
          },
          tagName: {
            type: String,
            default: 'div'
          },
          viewport: {
            type: typeof window !== 'undefined' ? window.HTMLElement : Object,
            default: () => null
          },
          threshold: {
            type: String,
            default: '0px'
          },
          direction: {
            type: String,
            default: 'vertical'
          },
          maxWaitingTime: {
            type: Number,
            default: 50
          }
        },

        data () {
          return {
            isInit: false,
            timer: null,
            io: null,
            loading: false
          }
        },

        created () {
          // 如果指定timeout则无论可见与否都是在timeout之后初始化


          if (this.timeout) {
            this.timer = setTimeout(() => {
              this.init()
            }, this.timeout)
          }
        },

        mounted () {
          if (!this.timeout) {
            // 根据滚动方向来构造视口外边距，用于提前加载


            let rootMargin
            switch (this.direction) {
              case 'vertical':
                rootMargin = `${this.threshold} 0px`
                break
              case 'horizontal':
                rootMargin = `0px ${this.threshold}`
                break
            }

            // 观察视口与组件容器的交叉情况
            // intersectionObserver解决目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"，比如在web网页开发中，常常需要了解某个元素是否进入了"视口"（viewport），即用户能不能看到它。


            this.io = new window.IntersectionObserver(this.intersectionHandler, {
              rootMargin,
              root: this.viewport,
              threshold: [ 0, Number.MIN_VALUE, 0.01]
            })
            // root：The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
            
            // rootMargin：Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.

            // threshold：交叉区域大小[0,1],也是触发回调函数的条件,即第一个参数


            this.io.observe(this.$el)
          }
        },

        beforeDestroy () {
          // 在组件销毁前取消观察


          if (this.io) {
            this.io.unobserve(this.$el)
          }
        },

        methods: {
          // 交叉情况变化处理函数


          intersectionHandler (entries) {
            if (
                
                //time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒

               // target：被观察的目标元素，是一个 DOM 节点对象

               // rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null

               // boundingClientRect：目标元素的矩形区域的信息

               // intersectionRect：目标元素与视口（或根元素）的交叉区域的信息

               // intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0 
                
                
                
              // 正在交叉


              entries[0].isIntersecting ||
              // 交叉率大于0


              entries[0].intersectionRatio
            ) {
              this.init()
              this.io.unobserve(this.$el)
            }
          },

          // 处理组件和骨架组件的切换


          init () {
            // 此时说明骨架组件即将被切换


            this.$emit('beforeInit')
            this.$emit('before-init')

            // 此时可以准备加载懒加载组件的资源
            this.loading = true

            // 由于函数会在主线程中执行，加载懒加载组件非常耗时，容易卡顿
            // 所以在requestAnimationFrame回调中延后执行


            this.requestAnimationFrame(() => {
              this.isInit = true
              this.$emit('init')
            })
          },

          requestAnimationFrame (callback) {
            // 防止等待太久没有执行回调
            // 设置最大等待时间


            setTimeout(() => {
              if (this.isInit) return
              callback()
            }, this.maxWaitingTime)

            /*兼容不支持requestAnimationFrame 的浏览器*/
            return (window.requestAnimationFrame || ((callback) => setTimeout(callback, 1000 / 60)))(callback)
          }
        }
      }
    </script>

还有vue组件懒加载


- 服务器渲染
原理:将htmlDOM渲染以及数据先在服务器端处理，再通过传字符串的方式传到客户端

react版本：

```js
  // server/page.js
var React = require('react');
var ReactDOMServer = require("react-dom/server");

var App = require('../app/App');

var ReactDOM = require('react-dom');


module.exports = function(props) {
  //ReactDOMServer 对象使你能够将组件渲染为静态标记。 通常，它在 Node 服务器上使用：
  //renderToString()将 React 元素渲染到其初始 HTML 中。 该函数应该只在服务器上使用。 React 将返回一个 HTML 字符串。 您可以使用此方法在服务器上生成 HTML ，并在初始请求时发送标记，以加快网页加载速度，并允许搜索引擎抓取你的网页以实现 SEO 目的。
  

  // 在服务器上使用 renderToString ，而在客户端上使用 ReactDOM.hydrate() 。
	var content = ReactDOMServer.renderToString(
		<App initialCount={props.initialCount}></App>
	);

	var propsScript = 'var APP_PROPS = ' + JSON.stringify(props);
	//renderToStaticMarkup(),类似于 renderToString,除了这不会创建 React 在内部使用的额外DOM属性，如 data-reactroot。如果你打算使用客户端上的 React ，使标记具有交互性，请不要使用此方法。
	var html = ReactDOMServer.renderToStaticMarkup(
		<html>
			<head>
			</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={
					{__html: content}
				} />
				<script dangerouslySetInnerHTML={
					{__html: propsScript}
				}></script>
				<script src={"assets/entry.generator.js"}></script>
			</body>
		</html>
	);

	return html;
}
  // server/index.js
  var express = require('express');
var path = require('path');

var page = require("./page.generator.js").page;

var app = express();
var port = 8082;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', function(req, res) {
	var props = {
		initialCount: 9
	};
	var html = page(props);
	res.end(html);
});

app.listen(port, function() {
	console.log('Listening on port %d', port);
});
// App.js
var React = require('react');

var App = React.createClass({
	getInitialState: function() {
        return {
            count: this.props.initialCount
        };
    },

    _increment: function() {
        this.setState({ count: this.state.count + 1 });
    },

	render: function() {
		return (
			<div>
				<span>the count is: </span>
				<span onClick={this._increment}>{this.state.count}</span>
			</div>
		)
	}
})

module.exports = App;
//entry.js
var React = require('react'),
	ReactDOM = require('react-dom'),
	App = require('./App');

var APP_PROPS = window.APP_PROPS || {};

ReactDOM.render(
	<App initialCount={APP_PROPS.initialCount}/>,
	document.getElementById('root')
);
```

