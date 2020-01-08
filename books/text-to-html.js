// 第一步将html中的特殊字符转化为固定字符
// 第二步将空行匹配出来并且转化为<p>标签
// 第三步将链接匹配出来并且转化为<a>标签
const andReg = /&/;
const smallerReg = /</;
const biggerReg = />/;
const spaceReg = /^\s*$/;
const emailReg = /\b(\w[-.\w]*@[-a-z0-9]+(\.[-a-z0-9]+)*\.(com|edu|info))\b/
const linkReg = /http:\/\/[-a-z0-9]+(\.[-a-z0-9]+)\.(com|edu|info)\b(/[-a-z0-9_:@&?=+,])/
const replaceMap = {
    andReg: '&amp',
    smallerReg: '&lt',
    biggerReg: '&gt',
    spaceReg: '<p>'
}

const text = `
    This is a sample file.
    It has three lines.
    That's all
`