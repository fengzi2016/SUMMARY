import { initMixin } from './init'

export function Guan(options) {
    if(process.env.NODE_ENV !== 'production' && 
    !(this instanceof Guan)) {
        warn('Guan is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}

initMixin(Guan)
// stateMixin(Guan)
// eventsMixin(Guan)
// lifecycleMixin(Guan)
// renderMixin(Guan)

export default Guan