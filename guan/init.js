
import { initLifecycle, callHook } from './lifecycle'

let uid = 0
export function initMixin(Vue) {
    Guan.prototype._init = function(options) {
        const vm = this
        
        vm.uid = uid++


        // TODO: 21 - 28
        // 避免被观察的标志
        vm._isGuan = true;

        // 融合选项
        if(options && options._isComponent) {
            initInternalComponent(vm, options)
        } else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            )
        }
        //TODO 45 - 50
        vm._self = vm
        initLifecycle(vm)
        initEvents(vm)



    }
}

function initInternalComponent(vm, options) {
    const opts = vm.$options = Object.create(vm.constructor.options);
    // TODO: faster than dynamic enumeration
    opts.parent = options.parent;
    opts.propsData = options.propsData;
    opts._parentVnode = options._parentVnode;
    opts._parentListeners = options._parentListeners;
    opts._renderChildren = options._renderChildren;
    opts._componentTag = options._componentTag;
    opts._parentElement = options._parentElement;
    opts._refElm = options._refElm;

    if(options.render) {
        opts.render = options.render;
        options.staticRenderFns = options.staticRenderFns;
    }
}

