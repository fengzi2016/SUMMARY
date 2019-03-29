# learn html5

- contentedit属性，对可以获得焦点的元素进行编辑
- 对新的结构元素使用样式，以防止客户端不能支持
```css
article, aside, dialog, figure, footer, header, legend, nav, section {
  display: block;
}
nav {
  float: left; width: 20%;
}
article {
  float: right;
  width: 79%
}
```
- 另外ie8之前的浏览器不支持这些结构元素，所以需要用javascript来创建
## 表单
- 表单元素可以写在任何一个地方，只需要标明form属性
- 自动验证
  - required 必填
  - pattern 正则表达式匹配
  - min，max 限制数值或者输入的日期
  - step 间隔
- 显式验证
  - form元素，input，select，textarea都有一个checkValidity方法，返回值为布尔值
- 取消验证
  - form元素的novalidate属性
  - input或submit元素的formnovalidate属性
- 自定义错误信息
  - 用javascript调用input元素的setCustomValidity方法
  
