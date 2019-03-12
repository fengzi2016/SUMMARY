# React diff的关键点
1. diff方法的输入输出
```js
/**
* @param{HTMLElement} dom 真实DOM
* @param{vnode} vnode 虚拟DOM
* @returns {HTMLELEMENT} 更新后的DOM
*/
```
2. 虚拟DOM的结构
```js
// 原生DOM的vnode
{
 tag: 'div',
 attrs: {
   className: 'container',
 }
 children: []
}
// 文本节点的vnode
"hello,world"
// 组件的vnode 
{
  tag: ComponentConstructor,
  attrs: {
    className: 'container',
  }
  children: []
}
```
3. 对比过程
- 3.1 对比文本节点，判断dom类型，更新内容或者节点
- 3.2 对比非文本节点
  - 3.2.1 如果真实dom不存在或者新旧节点不一致，则新建一个节点，并将原来的子节点移动到新建节点之下
  - 3.2.2 如果真实DOM不存在，并且和虚拟DOM是同一个类型的，则后面再对比属性和子节点
- 3.3 对比属性 不仅要找出节点类型的变化还要找出节点的属性以及事件监听的变化
- 3.4 对比子节点，key作为标识
  - 3.4.1 如果更新前的对应位置为空，说明此节点是新增的
  - 3.4.2 如果更新后的节点和更新对应位置的下一个节点一样，说明当前位置的节点移除
- 对比组件

