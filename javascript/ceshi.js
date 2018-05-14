function test(...rest) {
    let sum = rest.reduce((accumulator,value)=>{
        accumulator += value;
        return accumulator;
    },0)
    return sum;
}
console.log(test(1,2,3))