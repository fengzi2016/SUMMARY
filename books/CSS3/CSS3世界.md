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