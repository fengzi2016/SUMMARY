
setImmediate(()=>{console.log('setImmediate')})
setTimeout(() => {
    console.log('settimeout') 
 },1);


process.nextTick(()=>{console.log('nextTick')})
Promise.resolve().then(()=>{
    console.log('promise1');
}).then(()=>{
    console.log('promise2');
})



console.log('end');

//caice
//