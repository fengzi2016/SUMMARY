# 自动化测试
## GUI自动化测试
- 将流水账改为面向对象型
- 某个页面对应某个class，页面的ui测试绑定在class的属性上面，作为属性的方法
- 将控件的逻辑概念 和 物理概念切开
```js
  Class loginPage{
    username_input = findElementByName('username');
    login_ok_button = findElementByname('login_ok_button');
  }
  login(username){
    loginPage.username_input.input(username);
    loginPage.login_ok_button.click();
  }
```
- 抽象层级
  - 组件操作抽象(Component Operation Abstract)
  - 页面操作抽象(Page Operation Abstract)
  - 业务操作抽象(Business Flow Abstact)
    - 例子：
      - Login Flow -> Search Book Flow -> Buy Book Flow -> Logout Flow
      - 上一个flow的结束页面是下一个flow的开始页面
      - 每个flow页面的出口和入口不一定是唯一的
      - 如果两个flow可以串联，则一定是在同一个页面上进行串联
      - 上下flow数据应该可以传递

      ```js
        // Business Flow - login flow
        LoginFlowParameters login FlowParameters = new LoginFlowParameters();
        loginFlowParameters.setUserName('username');
        loginFlowParameters.setPassword('password');
        LoginFlow loginFlow = new LoginFlow(loginFlowParameters);
        loginFlow.execute();

        // Business Flow - Search book flow
        SearchBookFlowParameters searchBookFlowParameters = new SearchBookFlowParameters();
        searchBookFlowParameters.setBookName('bookname');
        SearchBookFlow searchBookFlow = new SearchBookFlow(searchBookFlowParameters);
        searchBookFlow.withStartPage(loginFlow.getyEndPage()).execute();
      ```
  - 基于unified flow framework实现flow branch 控制（国际化）
    - 不同国家的页面以及操作可能不一样
    - 全局测试配置服务-核心原理
      - 获取函数
      ```js
        // 如果之前是用if else 来判断国家改为如下代码
        return GlobalRegistry.byCountry(GlobalEnvironment.getCountry()).getDefaultCurrency();
      ```
      - 配置文件
      ```js
        // Global Registry Repository
        shstoredId = 1
        defaultLocale = en-US
        defaultCurrency = USD
      ```
    - 通过后台用restful API 将配置文件返回
  - 基于Page Encapsulation Code Generator 提高Page Abstract的效率
    - 缺陷： 
      - 不同前端框架loginpage生成可能不同，适配要求高
      - 只要是控件都会生成，所以可能会生成多余的测试还要删除
      - 命名可能要修改
- 数据驱动测试

- GUI测试基础框架
  - 同一个实体的测试，flow，page在同一个域名下，由一个团队负责
- 提高GUI自动化测试稳定的技术手段
  - 非预计的弹出对话框 -> 异常场景恢复模式
  - 页面控件属性的细微变化 -> 组合属性 + 模糊识别
  - 被测系统的A/B测试 -> 测试代码分支处理
  - 随机的页面延迟照成控件识别失败 -> Retry机制
  - 测试数据问题
- GUI自动化测试的前沿技术
  - 无头浏览器
    - PhantomJS框架
    - chrome headless
    - Puppeteer
    - 网络爬虫
    - 环境Smoke
  - BDD行为驱动开发
    - 测试人员主导
    - 需求的闭环
    - Mapping的压力
    - 落地实践较少
  - 基于模型的GUI自动化测试技术（MBT）

## 测试数据的创建方法

- 通过API创建数据的优缺点
- 通过数据库创建数据的优缺点
- API+数据库结合的方式

  
