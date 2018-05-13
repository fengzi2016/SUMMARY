# VUE.JS深度学习笔记
## 进入/离开&列表过渡
### 实质

 实质就是动画不同阶段给DOM元素添加或删除不同的class

### 可用的情况

  1. v-if
  2. v-show
  3. 动态组件
  4. 组件根节点

总结：有普通渲染外的动态生成这个过程才可用

### 类名分类

 v-enter
 v-enter-active
 v-enter-to
 
 将enter改成leave就是另外3个



 ### 使用示例

    <div id="example-1">
    <button @click="show = !show">
        Toggle render
    </button>
    <transition name="slide-fade">
        <p v-if="show">hello</p>
    </transition>
    </div>

    new Vue({
        el: '#example-1',
        data: {
            show: true
        }
    })
     .slide-fade-enter-active {
            transition: all .3s ease;
      }
     .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
       }
     .slide-fade-enter, .slide-fade-leave-to
     transform: translateX(10px);
            opacity: 0;
    }
