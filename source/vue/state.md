# 关于State的总结
- val !== val 是对NaN进行了坚持
- set 里面的notify
- 对数组进行监听，通过监听数组是否使用了slice,push,pop等方法
- defineReactive 方法，双向绑定
```js
    const defineReactive = (
        obj, key, val, constomSetter, shallow
    ) => {
        var dep = new Dep();

        var property = Object.getOwnPropertyDescriptor(obj, key);
        // 不可配置
        if(property && property.configurable == false) {
            return;
        }
        // 简化get set
        var getter = property && property.get;
        var setter = property && property.set;

        var childOb = !shallow && observe(val);
        // 将对象属性加入到Dep.subs中，进行watch
        Object.defineProperty(obj, key, {
            enmuerable: true,
            configurable: true,
            get: function reactiveGetter() {
                var value = getter ? getter.call(obj) : val;

                if(Dep.target) {
                    if(childOb) {
                        childOb.dep.depend();
                    }
                    if(Array.isArray(value)) {
                        dependArray(value);
                    }
                }
            },
            set: function reactiveSetter(newVal) {
                var value = getter ? getter.call(obj) : val;

                if(newVal === val || (newVal !== newVal && value !== value)) {
                    return;
                }

                if ("development" !== 'production' &&       customSetter) {
                    customSetter();
                }

                if(setter) {
                    stter.call(obj, newVal);
                } else {
                    val = newVal;
                }

                childOb = !shallow && observe(newVal);
                // 触发所有的更新
                /* Dep : {
                    subs: [Watch, Watch],
                    id: number,
                    addSub: func,
                    removeSub: func,
                    depend: new Watch().addDep(dep) 创建或更新dep,
                    notify: subs[i].update()
                } */

                /*
                Watch: {
                    vm,deep,user,lazy,sync,
                    cb,id,active,dirty,
                    deps:[],newDeps:[],depIds, newDepIds, expression, value,
                    get:func => 
                    addDep: func => dep.addSub
                    cleanupDep: func,
                    
                },
                Observer: {
                    value,
                    dep,
                    walk: defineReactive()
                    observeArray: 把每个元素都递归new Observer
                }

                vm: {
                    _watchers:[Watch]
                }
                */
                dep.notify();
            }

        })
    },

```