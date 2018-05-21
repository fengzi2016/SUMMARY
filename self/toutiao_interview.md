# 今日头条笔试总结

## 难题 

1. date处理时间戳
2. class实现eventEmmit
3. 正则表达式实现匹配字符串
4. bind,this
5. 原码补码反码
6. 实现array
7. 保证ajax拉取的数据在用户点击按钮前能获取到

### 1. date时间戳
1. 日期转化为时间戳
```js
    let  time = '2014-04-23 18:55:49:123'
    let date  = new Date(time);
    console.log(Date.parse(time))
    console.log(Date.parse(date))
    console.log(date.valueOf())
    console.log(date.getTime())
```
特点：  
1. 必须将日期字符串转化成Date实例才能调用valueOf()，getTime()方法
2. Date.parse()方法可以传字符串也可以传Date实例
### 3.学习正则表达式


刷题练习

