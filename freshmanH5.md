# H5项目总结

## 项目涉及疑难技术
- ninja
  - 运行环境
- webpack
  - webpack配置
  - dist生成
- vue.js
  - 页面转化和父子间事件传递
  - 打字效果
- 雪碧图的使用
  - 如何定高宽以及定位
- scss
  - 动画
  - 全景
- ejs文件
  


## 1.ninja
在这次项目中搭建环境这项工作是学姐做的，所以对于一些环境文件我了解得较少，比如ninja的运行原理和控制文件，基本语法，这些以后都得花时间去了解。

## 2.webpack

### webpack配置
>webpack 是一个现代 JavaScript 应用程序的模块打包器(module bundler)。

在webpack.base.conf.js中，配置了以下参数：
 - Entry(入口);入口起点告诉 webpack 从哪里开始，并根据依赖关系图确定需要打包的内容。可以将应用程序的入口起点认为是根上下文(contextual root) 或 app 第一个启动文件

        entry: {
            index: './src/index.js',
        },

 - Output(出口);webpack 的 output 属性描述了如何处理归拢在一起的代码(bundled code)。

        output: {
                path: path.join(__dirname, "../"),
                filename: '[name].js',
                publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
        },

    path:生成后存放地点。

    filename:生成后文件名。

    publicPath:此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 < base > 标签）解析。

- Loader;loader 用于对模块的源代码进行转换。

      module: {
            rules: [{ test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        extractCSS: process.env.NODE_ENV === 'production'
                    }},{..},..],
         }

   

    这里配置各种文件被不同的loader转化。


- plugin(插件);用于解决loader解决不了的事。

         plugins: [
            new SpritesmithPlugin({
                src: {
                    cwd: './src/assets/first-page-assert/',
                    glob: '*.png'
                },
                target: {
                    image: './src/sprite/first-page-sprite.jpg',
                    css: './src/sprite/_first-page-sprite.scss'
                },
                apiOptions: {
                    cssImageRef: '../sprite/first-page-sprite.jpg'
                },
                spritesmithOptions: {
                    algorithm: 'top-down'
                }
            }),
            new SpritesmithPlugin({..}),
            .....
         ]

   这个插件用于解决雪碧图的生成，其中

    src:{cwd:源文件地址,glob:源文件格式}

    target:{image:目标文件地址,css:目标文件css文件地址}

    spritesmithOptions:{algorithm:排列方向}
    
    而其它new HtmlWebpackPlugin 插件则设置了template/中的各种文件最后生成在哪

### dist 生成

（在windows系统中）
  package.json文件中 

        "scripts": {
            "dev": "ninja start",
            "build": "node ./build/build.js"
        },
这行代码配置了命令
    
    若要本地运行项目在终端输入ninja start

项目打包输入 npm run build 

    系统将执行 node ./build/build.js,即运行bulid.js文件
        
**而在build.js中引入了config.index.js文件**

    module.exports = {
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'http://cdn.com/dist/',
        productionSourceMap: false,
        bundleAnalyzerReport: false
    },
    dev: {
        env: require('./dev.env'),
        assetsPublicPath: '/dist/'
    }
    }

文件中配置了所有打包后生成的静态文件的地址和对外公布的url。

**build.js中还引入了webpack.prod.conf.js文件**

    var webpackConfig = merge(baseWebpackConfig, {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.min.js'
        }
    },
    module: {
        noParse: /vue\.runtime\.min\.js/
    },
    output: {
        path: config.build.assetsRoot,
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]
})

文件中配置了各种打包文件在dist/中的地址以及名称。

这里可以看出webpack是模块化的，通过exports（模块暴露）和require（模块引入）在一个总文件中对各个模块进行调用。

## vue.js

### 页面转化和父子间事件传递
 
 此次项目所有的页面以组件的形式在App.vue中进行切换，所以页面变化时路由并没有变化，只是父组件的子组件改变而已。这也是为什么当把背景音乐放在父组件中，可以做到页面变化了而背景音乐不会停。

 这次页面转化用到了 **v-if**,判断父组件中data的show的值来控制页面 ，当用户在子组件中触发页面跳转按钮(@click=Schangepage())时，调用了子组件的Schangepage方法，Schangepage方法中应该$emit(Fchangepage),在父组件的此组件标签中应该有个监听事件@Fchangepage=changepage();最后调用了父组件的changepage方法，changepage方法中改变父组件的this.show，最后页面转化。

### 打字效果

此次项目中打字效果是利用JS控制htmlDOM实现，首先定义好要输出的内容，并且设置这段内容显示时需要换行的符号（这次用的是","）以及打字速度，通过不断地为一个已有的空textarea增加元素来打到打字效果，核心代码：

 **html**

     <form>
              <textarea id="typearea" disabled="disabled"  readonly="value" rows="10" cols="40" v-model="text" ></textarea>
    </form>

**vue.js**

    data(){
      return {
          change:1 ,
          speed:100,
          index:0,
          text_pos:0,
          baseText:',你好先锋军 #,如何成为一个有创造力的产品经理,变身前端高手,作为靠谱的后端工程师提供稳定数据,用Java打造完美的手机端应用, ,# 木犀团队,向你发出邀请,快来实现你的互联网技术梦和产品梦！',
          text:''  
      }
    methods: {  
        type_text:function(){  
              let char=this.baseText[this.index];
              if(char!==','){
                  this.speed=100;
                  this.text=this.text.substring(0,this.index);
                  this.text=this.text+char+'_';  
              }
              else{
                  this.text=this.text+'_';
                  this.text=this.text.substring(0,this.index)+'\n';
                  this.speed=1500;   
              }     
        },
    }

## 雪碧图的使用

在此次项目中，图片比较多，为了让图片更快地加载出来，采用了雪碧图。

### 雪碧图定高宽
  首先根据团队FEwiki中的[雪碧图配置方案](https://github.com/Muxi-Studio/FEwiki/blob/master/subject/Wireless-front-end/sprite.md),做到容器大小自适应,图片大小自适应(background-size)，图片偏移量自适应(background-position)。因为需要修改sprite插件生成的scss文件，但这个文件又是每次运行程序就会刷新的，所以需要新建个文件复制scss文件内容，其中除了@mixin sprite-size,@mixin sprite-postion 和@mixin sprite()不同，其它基本一致，然后在vue中import此文件就可以了。

  至于高宽的具体值，核心代码如下：

    @mixin father($width, $height, $top, $left) {
        width: ($width/750*100);
        height: ($height/1334*100);
        position: fixed;
        top: ($top/1334*100);
        left: ($left/750*100);
    }
其中
    
width:切出的图宽与设计图宽的比值*100，单位vw

height:切出的图高与设计图高的比值*100，单位vh

top:量出的距离与设计图高的比值*100，单位vh

lef:量出的距离与设计图宽的比值*100，单位vw

**但是后来发现这样写是有弊端的**，因为在做到雪碧图可以自适应时修改了@mixin sprite-size()，雪碧图的大小成为了父容器的90%;而我定义的父容器就是雪碧图的大小，所以最终展现的雪碧图大小比实际的要小。这也是为什么在做定位的时候发现图片布局有偏差。所以父容器的大小应该为 雪碧图的大小*（1/0.9）约等于1.11，即:

    width:切出的图宽与设计图宽的比值*1.11*100，单位vw

    height:切出的图高与设计图高的比值*1.11*100，单位vh


## scss

### 动画

此次动画大多数是抖动和闪现，利用了的主要的css属性为:

    animation:控制动画整体
    translate:控制移动方向
    opcity:控制透明度

在实现动画中出现了循环动画每次结束突然回到原位置和原状态（以下用‘回本位’代替）的问题，导致动画比较突兀不协调不顺畅。我的解决方法是，在@keyframes中控制，在50%{}中设置想要的动画结果，在100%{}设置动画的初始状态，这样写可以让回本位和动画用相同的时间，回本位和100%{}的状态重叠，就不会很突兀了。如：

     @keyframes design-shake {
        50%{
            transform: translateX(1vw) translateY(1vh);
         }
        100%{
             transform: translateX(0vw) translateY(0vh);
         }

    }

动画还有一个需要注意的点是各种浏览器内核需要不同的前缀，以下是比较简洁的解决的办法：

    @mixin anim($name $duration $timing-function $delay $iteration-count $direction){
        animation: $name $duration $timing-function $delay $iteration-count $direction;
        -webkit-animation:  $name $duration $timing-function $delay $iteration-count $direction;
        -o-animation:  $name $duration $timing-function $delay $iteration-count $direction;
        -moz-animation:  $name $duration $timing-function $delay $iteration-count $direction;
    }

## 全景

此次项目本来想用aframe来做全景，但是考虑到兼容性问题改为用css3实现。这次全景实现的立体图并不是球形而是一个棱柱体。原理就是由8块图片通过translate控制不同的偏移距离以及rotate控制不同的旋转角度（最终相加360）拼成一个封闭的棱柱体。示例代码：

    #panorama .face:nth-child(1) {
        background-image: url("http://static.muxixyz.com/2017h5/panorama-background.png");
        -webkit-transform: rotateX(90deg) translateZ(-155px);
        -moz-transform: rotateX(90deg) translateZ(-155px);
        transform: rotateX(90deg) translateZ(-30vh);
        }
    #panorama .face:nth-child(2) {
        background-image: url("http://static.muxixyz.com/2017h5/panorama-background.png");
        -webkit-transform: rotateX(-90deg) translateZ(-155px);
        -moz-transform: rotateX(-90deg) translateZ(-155px);
        transform: rotateX(-90deg) translateZ(-30vh);
    }

遇到的问题是棱角特别明显，虽然可以通过减小偏移角度来使得棱角模糊但是比较难控制，对背景图片的拼接要求比较大，最后采用几乎全黑的背景来减小棱角感。

**还有一个知识点就是实现用户滑动全景旋转**

这是用JS实现，通过移动端浏览器自带的方法获取用户动作的起始点以及结束点，对它们的差值进行运算得到父级div应该转动的角度后触发动画。核心代码如下：

     Move: function(e) {
      let startPos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        time: +new Date()
      };
      let endPos = {
        x: e.touches[0].pageX - startPos.x,
        y: e.touches[0].pageY - startPos.y
      };
      let isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
      if (isScrolling === 0) {
        e.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
      }
      if (this.drag) {
        this.r = this.x - e.touches[0].clientX;
        this.p.style.webkitTransform = "rotateY(" + this.r * 180 / 400 + "deg)";
        this.p.style.mozTransform = "rotateY(" + this.r * 180 / 400 + "deg)";
        this.p.style.transform = "rotateY(" + this.r * 180 / 400 + "deg)";
      }
    },




## ejs文件

>EJS 是 "Embedded JavaScript" 的缩写,通过嵌入具有 JavaScript 特色的功能来进行 HTML 模板渲染,嵌入式 JavaScript 模板。

此次部署时出现生成2个html文件而部署环境只允许有一个index.html文件的情况，这个时候就需要把2个html并在一起。此时就涉及到参照ejs文件合并页面代码的问题。我理解的ejs就是把某个html文件的某块代码用一个语法代替嵌入到另一个html文件中，简化代码量。

[ejs语法参考](https://segmentfault.com/a/1190000004286562)

