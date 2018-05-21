
// console.log(([])?true:false); 
// console.log(([]==false?true:false)); 
// console.log(({}==false)?true:false) 
// 'use strict'

// const where = () => {
//    //获取调用函数名字
//    //不严格模式下可以 arguments.caller.name;
//    let reg = /\s+at\s(\S+)\s\(/g;
//    let str = new Error().stack.toString()
//    let res = reg.exec(str) && reg.exec(str)
//    return res[0]&&res[1];
// }
// var myRe = /d(b+)d/g;
// var str = "cdbbdbsbz,cdbbdbsbz";
// var myArray = myRe.exec(str);
// var b = myRe.test(str);
// var m = str.match(myRe);
// var s = str.search(myRe);
// var r = str.replace(myRe,'$1')
// var sp = str.split(myRe);
// console.log('a:'+myArray[0])
// console.log('b:'+b);
// console.log('m:'+m);
// console.log('s:'+s);
// console.log('r:'+r);
// console.log('sp:'+sp)
// //分解路由
// const parseQueryString = function (query) {
    
//    // let myRe = /\?\w*(=\w*)*((&\w+){1}(=\w(?!#)*)*)*/g;
//     let myRe = /\?\S*(=\w*)*((&\w+){1}(=\w(?!#)*)*)*/g;
//     let result = {};
//     let r = myRe.exec(query);
//     if(r!==null){
//         let myArr =r[0] ;
//         let qu = myArr.split('?')[1];
//         qu = qu.split('&');
//         qu.map((item)=>{
//            let arr = item.split('=');
//            if(arr.length==2)
//             result[arr[0]] = arr[1] || '';
//            else result[arr[0]] = null;
//         })
//     }
//     return result;
    
//   }
//   console.log(parseQueryString('  https://scriptoj.com/problems/?offset=&limit=100#name=jerry '));
//   //console.log(parseQueryString('https://scriptoj.com/problems/#?offset=10&limit=100'))

let  time = '2014-04-23'
let date  = new Date(time);
console.log(Date.parse(time))
console.log(Date.parse(date))
console.log(date.valueOf())
console.log(date.getTime())