# learn html5
- html元素架构

| 元素 | 标签 | 特点 | 属性 |
|-----| ---- | --- | ---- |
| 根元素 | html | 其它元素都为其后代 | lang |
| 文档元数据|  base, title, meta, head, style, link| 含有页面相关信息，有利于seo ||
| 分区根元素 | body | document.body可以访问到| onafterprint, onblur, onerror, onhashchange, onmessage,onresize, onstorage, onundo
| 内容分区 | html5  新增的语义化标签比如：footer，header，section|  将文档内容根据逻辑划分 | |
| 文本内容 |  div, p, pre, ul, blockquote, dd, dir, hr, li ... | 这些元素能标识内容的宗旨或结构 | |
| 内联文本语义 | a, abbr, b, i, em, mark, kbd, sub, sup, time | 定义一个单词，一行内容，或任意文字的语义，结构或样式| |
| 图片和多媒体 | area，map，audio，img，vedio，track | 多媒体元素，音频，视频 | |
| 内嵌元素 | applet, embed, iframe, noembed, object, param, source, picture| 除了常规的多媒体内容，HTML 可以包括各种其他的内容，即使它并不容易交互。||
| 脚本 | canvas, noscript, script |为了创建动态内容和 Web 应用程序，HTML 支持使用脚本语言，最突出的就是 JavaScript。某些元素支持此功能。||
| 编辑标识 | del, ins | 这些元素能标示出某个文本被更改过的部分。 | cite, datetime |
| 表格内容 | caption, col, colgroup, table, tbody, tfoot, th, td, tr, thead |  这里的元素用于创建和处理表格数据。 ||
| 表单内容 | button, select, input, datalist, form, label, legend, progress, textarea| HTML 提供了许多可一起使用的元素，这些元素能用来创建一个用户可以填写并提交到网站或应用程序的表单||
| 交互元素 | details, summary, dialog, menu, menuitem | HTML 提供了一系列有助于创建交互式用户界面对象的元素||
| web组件 | template, slot, element| 允许创建自定义元素，并如同普通的 HTML 一样使用它们。此外，你甚至可以创建经过自定义的标准 HTML 元素。 ||
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
### 表单的基础知识
- 元素类型 HTMLFormElement类型，其继承HTMLElement
| 属性 | 描述 |
| --- | --- |

- 禁止重复提交表单
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
  