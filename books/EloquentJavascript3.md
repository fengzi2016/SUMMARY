# 一、 值类型和运算符
1. Javascript 使用固定数量的位(64位)来存储单个数字值
2. 对于N个十进制数字，可以表示的数值数量为10^N,给定64个二进制数字，可以表示的数字为2^64个数字，大概为18亿亿
- 去掉符号位和小数位，JS实际能存储的数字大概在9亿亿
- 计算大整数很精确，但是计算小数精确度不高
- 0/0 或 Infinity-Infinity 或任何其他数字操作，当不会产生有意义的结果时，你将得到NaN
- Javascript 将字符出建模为一系列位，基于Unicode标准，为每个字符分配一个数字，数字是16位数字，最多可以表达2^16个不同字符
- NaN !== NaN
## 二. 函数
- 函数每次调用都会重新创建局部绑定，而且不同的调用不能覆盖彼此的局部绑定。
- 难题：从数字1开始，反复加5或乘3，可以产生无限数量的新数字，编写一个函数，给定一个数字，找出产生这个数字的加法和乘法序列
```js 
function findSolution(target) {
    function find(current, history) {
        if(current == target) {
            return history;
        } else if(current > target) {
            return null;
        }
        
        else {
            return find(current + 5 , `${history} + 5`) || find(current * 3, `${history } * 3`)
        }
    }
    return find(1, '1');
}
```