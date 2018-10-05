//完成将 toChineseNum， 可以将数字转换成中文大写的表示，处理到万级别，例如 toChineseNum(12345)，返回 一万二千三百四十五。
// 中文单位 万千百十
//出现的可能
// n万n千n百n十n
// n万0n百n十n
// n万0十n
// n万0n

// const toChineseNum = (num) => {
//     let arr = num.toString().split("");
//     let per = ['万','千','百','十'];
//     let china = ['零','一','二','三','四','五','六','七','八','九'];
//     let start = per.length+1-arr.length;
//     let result = "";
//     for(let i=0;i<arr.length;i++) {
        
//       result+=china.find((w,index)=>{
//         return Number(arr[i])===index;
//       });
      
//       result+=per[start]&&arr[i]!=='0'?per[start]:"";
//       start++;
//     }
//     result=result.replace(/(零*$)/,"")
//     result=result.replace(/(零+)/,"零")
//     return result;
//   }
// console.log(toChineseNum(66046247));
function Vue() {
  this._init('ss')
}
function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log(this)
  }
}
initMixin(Vue);
Vue()