# 读halo-serve总结
## TS用法
- Record<T,U> 代表着将T和U的属性进行合并
- infer T 代表待确定的类型
- never 代表永远不可能出现的类型
- .filter(Boolean)筛选掉null,undefined, ""
- lodash.chain(val).xxx().xxx().value() 函数式编程
- lodash.omitBy(obj,null) 返回除了null的值
## 封装逻辑
- 异常处理
- 全局变量
- 日志打印
- 配置融合
- 中间件处理
- 数据库连接
- 参数检验
- 监控集成
