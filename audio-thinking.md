# HTML5音频总结

现在在网页中最常见的嵌入音频的方法莫过于 < audio >标签,audio标签的各种属性和方法也很容易搜索出来:[Audio对象](http://www.w3school.com.cn/jsref/dom_obj_audio.asp)。但是用< audio >标签需要注意这么多缺点：

1. **兼容性**

![兼容性](https://wx4.sinaimg.cn/mw690/006P0MECgy1fm3r09es50j31880bw3yy.jpg)
很显然，Opera Mini就没有实现audio标签，而且毕竟audio是HTML5的新特性，虽然大多数浏览器的最新版本都实现了，但是无法保证所有用户都使用了浏览器最新版本。

2. **格式支持**

在不同浏览器下，对各种不同格式的音频文件支持程度不一样。因此，一般的解决方法是为一个audio 添加多个 source 元素。

示例如下：

     <audio> 
        <source src="music.mp3">
        <source src="music.ogg">
        <sourec src="music.wav">
    </audio>

3. **在移动版 Safari浏览器中audio的限制更明显**。

比如只能实现单音频流。也就是说在这种浏览器中一次只能播放一个音乐，前面的audio会被后面覆盖，还有需要通过事件来触发音频播放。初始化音频延时等等问题。

详情请戳[《克服IOS HTML5音频的局限》](https://www.ibm.com/developerworks/cn/web/wa-ioshtml5/index.html)

4. **无法实现比较复杂的音效**

缺陷包括：


>  - 无法为声音信号使用滤波器
> - 无法访问原始的PCM数据
>  - 没有来源和听众位置，方向概念
>  - 没有颗粒度的计时

详情请戳[《用HTML5 Audio API开发游戏音乐》](http://www.uml.org.cn/html/201206271.asp)


既然audio标签拥有这么多缺陷，总需要找出一些方法来解决。为此，必须从WEB API角度来探索，html中音频实现的原理。

## Web Audio

> Web Audio还是一个比较新的JavaScript API，它和HTML5中的< audio >是不同的，简单来说，< audio >标签是为了能在网页中嵌入音频文件，和播放器一样，具有操作界面，而Web Audio则是给了开发者对音频数据进行处理、分析的能力，例如混音、过滤等，类似于对音频数据进行PS。

对于web audio的应用，比较基本操作的就是:
1. 初始化audio content
2. 创建audio node
3. 播放声音
4. 时间控制

基本利用示例详情请戳[《web audio 初步介绍和实践》](http://www.cnblogs.com/ericHTML5/p/4039530.html)

对web audio api的各种属性和方法的详细了解请戳[《网页音频接口的基本概念》](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API)




    

