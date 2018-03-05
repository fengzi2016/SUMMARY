# c++系统学习第一天
## 知识点
### 第一章
- **const** type name = value //const定义必须赋初始值，后期不能修改
- setw(n) 设置输出n个长度，缺少补全
- setprecision(n) 设置精确度，即规定小数点后有几位
- left，right 设置对齐方向
- 变量属性： Name(名字),Type(种类),Lifetime(生存时间),Scope(作用域)
- 没有初始值的变量的值是undefined;
- 命名规范：1.下划线_开头。2.不允许空格和特殊字符串作为名字 3. 不能是保留字 4. 对大小写敏感 5.小于31个字符
- include "simpio.h" 此库包括 GetInterger,GetLong,GetReal,GetLine 方法，等待用户输入一行文字，返回int,long,double,string类型的输入值 例子：n = GetInterger();
- 输出： 字符串和变量可以用 “<<” 连接 一起输出，如cont<<"The result is"<< val << endl;

### 第二章
- 枚举类型 **enum** name {element-list}

举例：
```c++
enum directionT {North ,East ,South,West};
//创造一个枚举类 directionT
directionT dir;
//再创建一个枚举实例 dir

directionT RightFrom (directionT dir){
    return directionT((dir+1)%4);
    //dir 类似于枚举集合的首个下标
    
}
//directionT(dir) 是枚举集合的首个枚举值
for (directionT dir  = North;dir <= West;dir = directionT(dir+1))


```
枚举类型每个值有默认值为 枚举下标，比如上例中North的下标为0，默认值为0。如果想赋值，则在定义的时候应该写 enum directionT{North = 10,East},当某个枚举值后面的值没有定义默认值时后面的枚举值的值为此枚举值的值+1，即其中East = 11。

- sizeof(int)返回参数所需要占的内存大小
- 
```c++
 int x,y;
 int *p1 *p2;
 x=-42;y=163;
 p1=&x;p2=&y;
 *p1  //-42;
 *p2 //163;
 *p1 = 17;
 x //17
 p1 = p2 // 把p2的地址给p1 则 *p1 等于y
 *p1 = *p2 //把p2指向的值赋给*p1 x等于y
```
- 计算数组有多少个元素，即长度
```c++
 int a[]={1,2,3};
 int number = sizeof a / sizeof a[0];
```
- 传数组进入函数
```c++
 int SumIntegerArray(int array[],int n);
 int SumIntegerArray(int *array,int n);
```
- 结构体与指针
```c++
    struct employeeRecordT{
        string name;
        string title;
        string ssnum;
    };
    employeeRecordT *empPtr;
    employeeRecordT empRec;
    empPtr = &empRec;
    *(empPtr.salary);
    empPtr->salary
```
- 动态分配
```c++
 int *ip = new int;
 employeeRecordT *empPtr = new emploeeRecordT;
 int *intList = new int[12];//分配了12个int大小的内存
 //和new 配套的释放空间操作
 delete ip;
 delete[] intList;
```
- 库与接口

<random.h>

包括的方法：RandomInteger,RandomReal,RandomChance,Randomize

- 接口板式
```c++
 #ifndef _random_h
 //如果_random_h在之前就已经定义了则不会执行到endif之间的代码
 #define_random_h
 //在这里面定义random.h里面的方法
 int RandomInteger(int low,int high);
 //返回两个数间的随机数包括界点
 double RandomReal(double low, double high);
 //[0,1),左闭右开
 bool RandomChance(double p);
 //返回p概率下的布尔值
 void Randomize();
 //生成一个伪随机数，在同一个运行环境下，每次运行生成的随机数都相同。
 #endif
```


- <string>接口 
```c++
    string str1 = "Hello Word!";
    int numChars =str.length();//返回字符串长度
    str.at(pos) == str[pos]; 
    //两个都返回字符串中下标为pos的字符
    str.substr(pos,len);
    //返回从pos位置开始的长度为len的字符串，str并没有改变，如果len没给，则到最后一个字符
    str.find(ch,pos)
    //返回从pos位置开始找等于ch字符的下标，如果没有给pos，则第一个字符开始找。如果没出现，则返回string::npos这个定值
    str.find(pattern,pos)//和上面一样，只不过是找pattern这个字符串
    str.insert(pos,txt)//将txt从str的pos位置插入
    str.replace(pos,count,txt)//将str从pos位置开始的count长度的字符串用txt代替
    

```

- <strutils.h>头文件
```c++
    #ifndef _strutils_h
    #define _strutils_h
    #inclde "genlib.h"
    string ConvertToLowerCase(string s);//将字母转为小写
    string ConvertToUpperCase(string s);//将字母转为大写
    int StringToInteger(string s);//将字符串转换成数字
    string IntegerToString(int n);//将数字转换成字符串
    string RealToString(double d);//将浮点数转换成字符串
    double StringToReal(string s);//将字符串转换成浮点数
    #endif
    
```
- 转换成C++字符串
```c++
    string str = string("Hello");
```
- 标准输入输出文件<iostream.h>

- 获取和修改文件内容
```c++
  ifstream infile;//输入文本流变量
  ofstream outfile;//输出文本流变量
  infile.open("jabberwocky.txt");//打开文件，参数是c风格的
 //如果 文件名是变量表示的:
 string str = ...;
 infile.open(str.c_str());//将变量str转换成c风格的字符串
//如果 打开文件失败:
if(infile.fail())Error("Could not open file")
infile.clear();
//数据处理完毕，关闭文件
infile.close();

cin>> //输入  
cout<<//输出： 数字，字符串，数组第一个元素，不能直接输出结构体，要根据属性输出
cerr //报错


```