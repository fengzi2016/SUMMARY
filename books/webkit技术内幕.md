# 第一遍
## 第一章
### 总结
- webkit和其他浏览器内核的关系
    - webkit是从KHTML脱离出来的
    - Blink是从webkit脱离出来的
    - WebCore是嵌入式的编程接口，可以被各浏览器调用，WebCore包括了CSS，HTML解释器和布局等模块，不包括JS引擎
    - webkit2添加了多进程的特性
- 浏览器比较重要的概念
    - 网络，资源管理，网页浏览，多页面管理，插件和拓展，账户和同步，安全机制，开发者工具
## 第二章
### 总结
- HTML有3个概念：树形结构，层次结构，框结构
- 网页解析分为3部：资源加载，资源渲染，资源重复渲染
    - 资源渲染分为3个部分：DOM树，CSS树，CSS+DOM树，位置计算（布局），2D+3D 绘图上下文
## 第三章
### 总结
- chromium多线程模型
    - Renderer进程：页面渲染
    - NPAPI插件进程：NPAPI类型的插件
    - GPU进程：3D图形加速
    - Peper插件进程
- 进程特征
    - Brower进程和页面的渲染分开，保证页面渲染不导致浏览器崩溃
    - 网页是独立进程
    - 插件是独立进程
    - GPU加速是独立进程
- Renderer进程配置
    - Process-per-site-instance： 每个页面创建独立Render进程
    - Process-per-site：同一个域的页面共享一个进程
    - Process-per-tab：每个标签页创建独立进程：默认
    - single process： 所有的渲染工作都在Browser进程中进行