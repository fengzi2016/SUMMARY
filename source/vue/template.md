# compiled 相关知识
## index
1. 目录 vue/src/compiler/index.js
2. 步骤
## parser
1. 目录 vue/src/compiler/parser.index.js
2. 解析
    - 获取options.module里的module处理函数来对element进行处理
    - parseHTML 解析HTML字符串
        - 改变状态标签
        - preTransforms[i](element, options)
        - start 当遇到一个开始标签时
            - 生成pre,原生Attrs, For, If, Once, Element，根据AST的属性进行获取
                - 生成Element包括 生成key,Ref,slot,component,attrs,
                - 生成components是来处理'is'的，el.component = (is的值)
            - root判断，因为slot和template不能做根
            - if条件判断和记录，最终记录在el.ifCondition里，它的数据结构为[ { exp: 条件, block: el}]
        - end 当遇到一个结束标签时
            - 如果记录栈的顶部是空白，将其删除
            - 改变状态标签
        - chars 当遇到标签内的字符串时
            - 如果没有父组件则返回
            - 处理{{text}}部分，将{{text}}转为{expression: '_s(text)', token: [{'@binding': 'text'}]}
            - 更新children列表
        - 处理comment 更新父元素的子元素列表
