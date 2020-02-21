
import config from '../config'
import { noop }from 'shared/util'

// 管理着开发环境的bug输出
// 先初始化各种函数
export let warn = noop;
export let generateComponentTrace = noop
export let formatComponentName = noop;



if(process.env.NODE_ENV !== 'production') {
    const hasConsole = typeof console != 'undefined';
    warn = (msg, vm) => {
        const trace = vm ? generateComponentTrace(vm) : ''
        
        if(config.warnHandler) {
            config.warnHandler.call(null, msg, vm, trace)
        } else if(hasConsole && (!config.silent)) {
            console.error(`[Guan warn]: ${msg}${trace}`)
        }
    }
}
// 匹配但不记住开头位置或者
// 记住开头是-的首字母
// 将-删除并且转化为大写
// 如果是_开头则不转化为大写
const classifyRE = /(?:^|[-_])(\w)/g
const classify = str => str
    .replace(classifyRE, c => c.toUpperCase())
    .replace(/[-_]/g, '')

generateComponentTrace = vm => {
    if(vm._isGuan && vm.$parent) {
        const tree =  []
        let currentRecursiveSequence = 0
        // 如果有实例
        while(vm) {
            // 如果树不为空
            if(tree.length > 0) {
                // 取出最后一个
                const last = tree[tree.length - 1]
                //如果最后一个实例与参数实例相等
                if(last.constructor  === vm.constructor) {
                    //增加高
                    currentRecursiveSequence ++
                    // 参数转化为参数的父组件
                    vm = vm.$parent
                    continue
                }
                // 如果是另一个组件的实例并且树的高大于0
                else if(currentRecursiveSequence > 0) {
                    // 将新组件和实例以数组的方式存入树的最后
                    tree[tree.length - 1] = [last, currentRecursiveSequence]
                    currentRecursiveSequence = 0
                }
            }
            tree.push(vm);
            vm = vm.$parent;
        }
        return `\n\nfound in \n\n`+ tree.map((vm, i) => `${
            i === 0 ? '-->' : repeat(' ', 5 + i*2)
        }${ Array.isArray(vm) ?
            `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
            : formatComponentName(vm)
        }`)
        .join('\n')
    } else {
        return `\n\n(found in ${formatComponentName(vm)})`
    }
}
 formatComponentName = (vm, includeFile) => {
    if(vm.$root === vm) {
        return '<Root>'
    }
    const options = typeof vm === 'function' && vm.cid != null 
    ? vm.options 
    : vm._isGuan
      ? vm.$options || vm.constructor.options
      : vm || {}
    let name = options.name || options._componentTag
    const file = options._file
    if(!name && file) {
        const match = file.match(/([^/\\]+)\.guan$/)
        name = match && match[1]
    }
    return (
        (name ? `<${classify(name)} >` : `<Anonymous>`) + 
        (file && includeFile !== false ? `at ${file}` : '')
    )
}
// 利用二分法的方式重复，n>>=1表示处以2取商
const repeat = (str, n) => {
    let res = ''
    while(n) {
        if(n % 2 === 1) res += str
        if(n > 1) str += str
        n >>= 1
    }
    return res
}