# 模版编译原理
ps： 由于时间问题，先不学习源码

参考链接：
- [Vue模版编译原理](https://github.com/berwin/Blog/issues/18)

## 整体逻辑
1. 模版字符串 => element ASTs (解析器)
2. 对AST 进行静态节点标记 => 虚拟DOM的渲染优化（优化器）
3. 使用 element ASTs 生成 render 函数代码字符串 （代码生成器）