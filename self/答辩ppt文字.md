目录结构：
1.	个人经历
    a)	自我介绍
    b)	教育经历
    c)	学习项目经历
    d)	其他公司实习经历
    e)	在腾讯的1个多月的经历
2.	项目背景【在公司做了什么】
a)	写了关于应用宝、今日头条、抖音等APP 的《竞品分析-广告模式》报告一份。全报告3735字，主要从网络上搜索关于以上流行APP的广告投放方式、运营模式
b)	在熟悉团队的开发环境道路上，将踩到的坑进行总结并且将总结贴到halo-guide中，让以后的新人能更快掌握各种工具
c)	【用户触达】游戏预约 QQ群创建与预约群素材吐出jssdk封装
d)	完成 魔筷电商平台对接-前端技术栈选型报告，全报告1556字，主要是从网络上搜索当代流行的移动端开发技术和组合方案后，比较它们的优缺点，并且结合团队技术积累和开发者熟悉程度，最后得出最佳的技术栈。
e)	免费小说相关需求：
    i.	灰度测试、上线后的BUG以及视觉体验效果修复，【30+tapd】
    ii.	对某些功能代码比如Report重构
    iii.	添加缺失的数据上报模块，比如首页数据获取失败，代码执行失败上报
    iv.	在数据上报平台对数据进行整理分析
    v.	优化需求实现比如左右，上下翻页、字体，夜间模式
    vi.	试读需求实现
    f)	渠道包需求，学习zengbo之前封装的taiyi框架，为更好得完成需求对框架进行拓展。
    g)	流量联盟需求，学习framework框架，为了完成需求对框架进行拓展。

总结：
虽然我是前端开发，但是必须对自己所开发的产品的优劣势掌握清楚，关心产品的走向，参与产品的策划，把自己当作产品的缔造者、策划者，不仅仅是实现需求，而是要自己先对需求有所了解，知道为什么要这么做，并且评价好不好，敢于“互怼”，不能埋头苦干，却经常做无用功。当参与一款产品开发之后要多关注产品上线之后的反馈，不断跟进产品的线上效果，对产品的过去，现在，将来熟悉掌握。


3.	重点展开阅读小说
    重点项目展开：免费小说。
    之前是什么，我做了什么，因为我做了什么而做了什么改变，未来我会做什么
-	之前的问题
    	经过4个人编写，代码风格不一，历史包袱沉重，代码冗余严重
    	在各种测试之后暴露出很多小bug
    	数据统计项目不完善，数据统计文档不全且意思难懂
    	小说的整体功能只能满足需求，体验较差，功能待完善

 
-	我做了什么

    i.	回归测试，灰度测试、上线后的BUG以及视觉体验效果修复【30+tapd】【图片】
    ii.	对某些功能代码比如上报Report重构，根据上次同事的分享结论将项目中某些比较混乱的代码重构【图片】
    iii.	添加缺失的数据上报模块和字段，比如首页数据获取失败，代码执行失败上报，全局处理加载错误【图片】
    iv.	在数据上报平台对数据进行整理分析，输出H5报表数据集合，并且将其和平台的数据进行对比，找出缺陷【图片】
    v.	优化需求实现比如左右，上下翻页、字体，夜间模式实现待测试上线
    vi.	二阶段需求：试读需求实现待测试上线
-	改变了什么
	保证了免费小说的正常测试和上线进程
	代码质量提升，减少冗余代码
	数据上报和统计更容易，文档更清晰
-	未来：
	持续优化体验：在满足功能需求的同时，借鉴流行方案结合本项目的特定进行技术更新。
	H5阅读小说的应用的核心问题
1.	点击跳转：这个相对容易处理，而且方案也很多，页面为单位，可以单页面实现，通过路由支持，这样的框架很多了  
2.	滑动翻页：与点击跳转最大的不同点就是页面的“连续性”与“页面的无缝连接” 
3.	组合形式：点击跳转与滑动翻页的行为的组合方式
-	页面复杂度，一个页面节点数，不同节点与不同节点关系，不同节点与不同窗口的关系
-	动态加载。目前是懒加载，还可以做到的优化是动态加载，当从第2页翻到第3页时，需要做到将第1页节点删除并且提前加载第4页
-	多线程方案，对不同的页面起一个进程
4.	问题展开
5.	总结
6.	专业影响力和贡献
