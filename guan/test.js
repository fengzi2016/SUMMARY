const classifyRE = /(?:^|[-_])(\w)/g
const classify = str => str
    .replace(classifyRE, c => c.toUpperCase())
    .replace(/[-_]/g, '')
const demo = ['_guan', 'guan', '-guan']
demo.forEach((i) => {
    console.log(classify(i));
})

console.log('_guan'.match(classifyRE))

const repeat = (str, n) => {
    let res = ''
    while(n) {
        if(n % 2 === 1) res += str
        if(n > 1) str += str
        n >>= 1
    }
    return res
}
console.log(repeat('s|', 2))