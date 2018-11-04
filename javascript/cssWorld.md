# cssWorld总结

- 浏览器渲染的基本原理：
    首先，先下载文档内容，加载头部的样式资源（如果有的话），然后按照从上到下，自外而内的顺序渲染DOM内容，即先渲染父元素，再渲染子元素，当已经有子元素渲染完成，还未渲染的子元素有width:100%就会溢出。
- 流式布局下的宽度分离原则
    - 反面例子:最终宽度是142px
    ```css
        // 父元素 100px
        .box{
            width:100%;
            border:1px solid;
            padding:20px
        }
    ```
    - 正面例子：最终宽度是102px,子元素宽度60px，且padding 为20px border为1px
    > 嵌套一层标签，父元素定宽，子元素因为width使用的默认值是auto，所以会如水流般自动填满父元素
    ```css
        .father{
            width:102px;
        }
        .son{
            border:1px solid
            padding:20px
        }
    ```
- width:100%
    解释：任何元素都是"流"态的，默认情况下铺满整个父元素的盒子。
- display
    解释：其实每个元素应该有2个抽象意义上的盒子，例子:inline-block代表外面的是inline盒子，里面的是block盒子，所以这种元素可以定高宽，但又是横着排
- height:100%
    - 解释: 根据父元素的高而计算出的高度
    - 使其产生效果:
    ```css
        //1. 根元素100%，子元素高根据父元素content box计算
        html,body{
            height:100%
        }
        // 2. 父元素固定高宽，子元素高根据父元素content box计算
        // 3 . 绝对定位，子元素高根据父元素padding box计算
        div {
            height:100%;
            position:absolute
        }
        
    ```
- box-sizing
    - 解决替换元素（尺寸由内部元素决定）宽度自适应问题。
    - 各种属性在不同浏览器中的支持程度不一，其中border-box被全线支持。
    - 例子:原生普通文本框<input>和文本域<textarea>的100%自适应父容器宽度。
    ```css
        textarea{
            width:100%;
            box-sizing:border-box;
            -ms-box-sizing:border-box;
        }
    ```
    - 通用：
    ```css
        input,textarea,img,video,object{
            box-sizing:border-box
        }
    ```