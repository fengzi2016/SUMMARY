# CSS3世界
##
### 首选最小宽度
- 东亚字体为单个字
- 西方文字由特定的连续的英文字符单元决定，可以用word-break: break-all来让其变为单个字母
### 最大宽度
- 如果内部有块级盒子，则为设置white-space: nowrap之后的宽度
- 如果内部没有块级盒子或者块级盒子没有设定宽度值，则最大宽度是最大的连续内联盒子的宽度
### 实现自定义滚动
- 借助原生的滚动，scorllLeft/scollTop值变化
- 根据内部元素的尺寸和容器的关系，通过修改内部元素的位置实现滚动效果

### 流体布局下的宽度分离原则
- width 和 height 的默认值为 auto
- margin 不影响元素的尺寸
- 宽度分离
  - width属性不与影响宽度的padding/border属性共存
  ```css
   .father {
     width: 180px
   }
   .son {
     margin: 0 20px;
     padding: 20px
     border: 1px solid;
   }
  ```
  - 利用box-sizing来控制置换元素
### 如何让元素支持height：100%
1. 设置显示高度值
2. 使用绝对定位
### 展开出现更多
```html

<input id="check" type="checkbox">
<p>个人觉得，...</p>
<div class="element">
  <p>display:table-cell其他...</p>
</div>
<label for="check" class="check-in">更多↓</label>
<label for="check" class="check-out">收起↑</label>
```
```css
.element {
  max-height: 0;
  overflow: hidden;
  transition: max-height .25s;
}
:checked ~ .element {
  max-height: 666px;
}
```
### 动态...
```html
<div>正在加载中<dot></dot></div>
<style>

dot{
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -.25em;
  overflow: hidden; 
}
/* '\A'其实指的是换行符中的 LF 字符，其 Unicode
编码是 000A，在 CSS 的 content 属性中则直接写作'\A'；换行符除了 LF 字符还有 CR 字符，
其 Unicode 编码是 000D，在 CSS 的 content 属性中则直接写作'\D'。CR 字符和 LF 字符分
别指回车（CR）和换行（LF），content 字符生成强大之处就在于不仅普通字符随便插，Unicode
字符也不在话下。 */
dot::before {
 display: block;
 content: '...\A..\A.';
  white-space: pre-wrap;
 animation: dot 3s infinite step-start both;
}
@keyframes dot {
 33% { transform: translateY(-2em); }
 66% { transform: translateY(-1em); }
} 
</style>
```

### line-height
- css世界中文字内容是主体，内联元素默认是基线对齐，即x的底部
- veritcal-align:middle 不是相对容器中分线对齐，而是x基线往上1/2 x-height 高度
- css世界中文字高度分为
  - ascender height 上下线高度
  - cap height 大写字母高度
  - median 中线
  - descender height 下行线高度
- ex 单位表示x的高度，可以用来将图标设置高度为1ex 使其默认的baseline基线与文字对齐
- 纯内联元素 的高度由line-height 决定
- 对于块级元素，line-height 对其本身没有任何作用，改变line-height但是块级元素的高度会跟着变是通过改变块级元素里面内联级别元素占据的高度实现的
- 无论内联元素line-height 如何设置，最终父元素的高度都是由数值大的那个line-height决定
- 多行文字垂直居中
```html
  <div class="box">
    <div class="content">基于行高实现的</div>
  </div>
```
```css
.box {
  line-height: 120px;
  background-color: red;
}
.content {
  display: inline-block;
  line-height: 20px;
  margin: 0 20px;
  vertical-align: middle
}
```

### vertical-align
- 使用前提： 只能应用于内联元素以及 display 值为table-cell的元素即display 为 inline, inline-block, inline-table, table-cell。默认情况下作用雨 span, strong, em ,img, button, input, td 非html规范自定义标签
- 
- 属性值
  - inherit
  - 线类: baseline, top, middle, bottom
  - 文本类: text-top, text-bottom
  - 上标下标类: sub, super
  - 数值百分比类: 20px, 2em 20%
- vertical-align : baseline 等于 vertical-align : 0

### 百分比计算
- margin padding 相对于宽度计算
- line-height 相对与 font-size 计算
- vertical-align 相对于line-height 计算