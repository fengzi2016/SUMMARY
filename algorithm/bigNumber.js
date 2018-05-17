// JavaScript实现大数相加
//思路：利用字符串数字，从低位向高位加

function BigNumber(a,b){
    a = a.toString();
    b = b.toString();
    let overNum = 0;
    let sum,inNum;
    let arrA = a.split('').reverse();
    let arrB = b.split('').reverse();
    let resultArr = [];
    let len = Math.max(arrA.length,arrB.length);
    for(let i = 0;i<len;i++){
        sum = overNum;
        if(i<arrA.length){
            sum =  sum + arrA[i];
        }
        if(i<arrB.length){
            sum = sum+ arrB[i];
        }
        inNum = sum % 10;
        resultArr.push(inNum);
        overNum = Math.floor(sum / 10) ;
        
    }
    return resultArr.reverse().join("");

}




