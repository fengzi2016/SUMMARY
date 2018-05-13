# 图片加载优化

## 图片加载存在的问题
1. 启动页面加载过多图片
2. 部分图片体积过大

## 后果 

会导致页面加载速度慢，页面出现空白区域，浪费流量等等问题。

## 解决方法

1. **用css,svg,canvas,iconfont代替图片**。
2. **使用矢量图替代位图**。**矢量图**使用直线和曲线来描述图形，这些图形的元素是一些点、线、矩形、多边形、圆和弧线等等，它们都是通过数学公式计算获得的。例如一幅花的矢量图形实际上是由线段形成外框轮廓。**位图**亦称为点阵图像或绘制图像，是由称作像素（图片元素）的单个点组成的。这些点可以进行不同的排列和染色以构成图样。当放大位图时，可以看见赖以构成整个图像的无数单个方块。
3. 使用适当的**图片格式进行单位像素优化**。[常用web图片](http://jixianqianduan.com/frontend-weboptimize/2015/11/17/front-end-image-optmize.html)格式如下：

![图片格式](https://wx3.sinaimg.cn/mw690/006P0MECgy1foa8rl3qgyj30pt0n1tab.jpg)

4. 按照HTTP协议设置合理的**缓存**。[缓存](http://www.alloyteam.com/2016/03/discussion-on-web-caching/)
5. 
    ①使用CSS或者JS进行**预加载** 。如：
    ```css
    background-img:url(http://example.com/1.jpg)

    ```

    ```js
    var images = new Array()

    for (var i = 0; i < 3; i++) {

    images[i] = new Image()

    images[i].src = `http://example.com/${i}.jpg`

    }
    ```
    ②显性预加载：指处于预加载过程时页面有明确的加载提示，比如进度条或者是Loading图标。

    ③隐形预加载：通过推进触屏页面进度的趣味互动的方式。

6. 利用**雪碧图**，减少请求次数。
7. 对大部分图片，特别是轮播广告中的图片进行**按设备尺寸裁剪**，减少图片体积，减少网络开销，加快下载速率。不要用大的图再在HTML缩小，要多大图用多大图。
8. **懒加载**。[优先加载](https://zhuanlan.zhihu.com/p/33370207)所见屏幕需要的图片。原理：
①先将图片的实际src，记录在data-set属性中。
②监听屏幕滚动，计算图片的Y坐标，并计算可视区域的高度height，当Y小于等于(height+scrollTop)时，图片的src的值用data-src的来替换，从而来实现图片的懒加载。

9. **使用base64编码代替图片**，但是只适用于图片大小小于2KB且图片引用次数不多的情景。
10. **图片压缩**。

    部分平台：

    Kraken (Web) 主页： https://kraken.io/

    智图 主页： http://zhitu.tencent.com/ 支持原图png转为jpeg和webp(目前不支持bpg)，并提供各种压缩比压缩，目前在tx内部广泛使用。
11. **响应式图片**。通过picture元素，picturefill或平台判断来为不同终端平台输出不同的图片 。


参考链接：

- [让图片加载这件事儿变得更美好](https://aotu.io/notes/2016/03/09/img-loading-optimization-in-mobile/index.html)
- [前端开发中，对图片的优化技巧有哪些？](https://www.zhihu.com/question/21815101)
- [网页图片加载优化方案](https://zhuanlan.zhihu.com/p/33370207)
- [web前端图片极限优化策略](http://jixianqianduan.com/frontend-weboptimize/2015/11/17/front-end-image-optmize.html)

