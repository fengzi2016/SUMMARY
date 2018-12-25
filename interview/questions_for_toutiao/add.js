
function add(x,y){
    let xArray = x.split('').reverse();
    let yArray = y.split('').reverse();
    let sum = 0;
    let result = [];
    let overNum = 0;
    var len = Math.min(xArray.length,yArray.length);
    let numberX = changeToNumber(xArray);
    let numberY = changeToNumber(yArray);
    let tmp = 0;
    for(var i=0;i<len;i++){
        if(numberX[i]&&numberY[i]){
            sum = overNum;
            sum = sum + numberX[i]+numberY[i];
        }
        if(sum>=36){
            overNum = Math.floor(sum/36);
        }
        tmp = sum%36;
        if(tmp>9){
            tmp = strarr[tmp - 10];
        }
        result.push(tmp.toString())
    }
    
    if(xArray[i]){
        for(i;i<xArray.length;i++){
            sum = overNum+numberX[i]
           
                overNum = Math.floor(sum/36);
            
            tmp = sum%36;
            if(tmp>9){
                tmp = strarr[tmp - 10];
            }
            result.push(tmp.toString());
        }
        if(overNum!==0){result.push('1')}
       
    }
    if(yArray[i]){
        for(i;i<yArray.length;i++){
            sum = overNum+numberY[i];
            
                overNum = Math.floor(sum/36);
            
            tmp = sum%36;
            if(tmp>9){
                tmp = strarr[tmp - 10];
            }
            result.push(tmp.toString())
        }
        if(overNum!==0){result.push('1')}
    }
   

    return result.reverse().join("");
}
const strarr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
function changeToNumber(x){
    
    return x.map((v)=>{
        // console.log(x)
        if(v>='0'&&v<='9'){return v-'0';}
        else {
            // console.log(strarr.indexOf(v)+10);
            return strarr.indexOf(v)+10;
        }
        
    })
}
console.log(add('zzzzzzzz','111'))
console.log(add('1b','2x'))
console.log(add('1','az'))