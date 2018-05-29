
// // // console.log(([])?true:false); 
// // // console.log(([]==false?true:false)); 
// // // console.log(({}==false)?true:false) 
// // // 'use strict'

// // // const where = () => {
// // //    //获取调用函数名字
// // //    //不严格模式下可以 arguments.caller.name;
// // //    let reg = /\s+at\s(\S+)\s\(/g;
// // //    let str = new Error().stack.toString()
// // //    let res = reg.exec(str) && reg.exec(str)
// // //    return res[0]&&res[1];
// // // }
// // // var myRe = /d(b+)d/g;
// // // var str = "cdbbdbsbz,cdbbdbsbz";
// // // var myArray = myRe.exec(str);
// // // var b = myRe.test(str);
// // // var m = str.match(myRe);
// // // var s = str.search(myRe);
// // // var r = str.replace(myRe,'$1')
// // // var sp = str.split(myRe);
// // // console.log('a:'+myArray[0])
// // // console.log('b:'+b);
// // // console.log('m:'+m);
// // // console.log('s:'+s);
// // // console.log('r:'+r);
// // // console.log('sp:'+sp)
// // // //分解路由
// // // const parseQueryString = function (query) {
    
// // //    // let myRe = /\?\w*(=\w*)*((&\w+){1}(=\w(?!#)*)*)*/g;
// // //     let myRe = /\?\S*(=\w*)*((&\w+){1}(=\w(?!#)*)*)*/g;
// // //     let result = {};
// // //     let r = myRe.exec(query);
// // //     if(r!==null){
// // //         let myArr =r[0] ;
// // //         let qu = myArr.split('?')[1];
// // //         qu = qu.split('&');
// // //         qu.map((item)=>{
// // //            let arr = item.split('=');
// // //            if(arr.length==2)
// // //             result[arr[0]] = arr[1] || '';
// // //            else result[arr[0]] = null;
// // //         })
// // //     }
// // //     return result;
    
// // //   }
// // //   console.log(parseQueryString('  https://scriptoj.com/problems/?offset=&limit=100#name=jerry '));
// // //   //console.log(parseQueryString('https://scriptoj.com/problems/#?offset=10&limit=100'))

// // let  time = '2014-04-23'
// // let date  = new Date(time);
// // console.log(Date.parse(time))
// // console.log(Date.parse(date))
// // console.log(date.valueOf())
// // console.log(date.getTime())
// // String.prototype.add = function(){
// //     console.log(this)
//     console.log(this+'2')
   
// // }

// class EventEmitter {
//     constructor() {
//         this._events = {}
//     }
//     on(event,callback) {
//         // 获取之前存储的其它回调函数，没有则为空数组
//         let callbacks = this._events[event] || [];
//         // 将新回调函数加入函数数组
//         callbacks.push(callback);
//         // 将数组作为类的私有变量_events的属性名为event的属性值
//         this._events[event] = callbacks;
//         // 将类实例？还是类返回
//         return this;
//     }
//     off(event,callback) {
//         let callbacks = this._events[event] || [];
//         this._events[event] = callback.filter((fn)=> fn!=callback);
//         return this;
//     }
//     emit(...args) {
//         const event = args[0];
//         //取 args 这个数组中的从下标1到最后的元素赋给数组[]
//         const params = [].slice.call(args,1);
//         const callbacks = this._events[event];
//         callbacks.forEach(fn => fn.apply(this,params))
//         return this;
//     }
//     once(event,callback) {
//         let wrapFunc = (...args) => {
//             callback.apply(this,args);
//             this.off(event,wrapFunc);
//         }
//         this.on(event,wrapFunc);
//         return this;
//     }
    
// }

// let event = new EventEmitter();
// event.on('go',function(){
//     console.log(this)
// })
// event.emit('go')

//console.log(new Date(1111111))


var isAnagram = function(s, t) {
    let obj = {};
    let o= {};
    if(s.length != t.length) return false;
    let st = s.split('');
    let tt = t.split('');
    st.forEach((val)=>{
        if(obj[val]){
            ++obj[val] ;
        }else {
            obj[val] = 1;
        }
    });
    tt.forEach((val)=>{
        if(o[val]){
            ++o[val];
        }else {
            o[val] = 1;
        }
    });
   
    for(let i in obj) {
        if(!o[i] ||  o[i] != obj[i]){
            return false;
        }
    }
    return true;
};

let b = isAnagram("anagram","nagaram");
console.log(b)