# 学习如何分页
*在此次项目中我们的童‘总监’做成了分页的功能，在此我想总结一下。*
## ‘无组’分页
### 采用了jqPaginator插件，源码如下：

**js部分**

```
axios.post('/allMovies').then(function (ans) {
    let mynum = parseInt((ans.data.length/16))+1;
    let str = '';
    $('.ttx-my-number').jqPaginator({
        totalPages: mynum,
        visiblePages: 20,
        currentPage: 1,
        onPageChange: function (num, type) {
            let str = '';
            let mycurrentnum = (num-1)*16;
            let myendnum = num*16 - 1;
            if(myendnum > ans.data.length - 1){
                myendnum = ans.data.length - 1;
            }
            for (let i = mycurrentnum; i <=myendnum; i++) {
                str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                str += `<a onclick="myonclickhrf(${ans.data[i].id})"><img class="center-block ttx-movie-photo" src="${ans.data[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans.data[i].id})" >${ans.data[i].name}</a><strong>${ans.data[i].score}</strong></p>`;
                str += `</div>`;
            }
            $(".ttx-movie-container").empty().append(str);
        }
    });

});

 ```
 **html部分**

```
<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 ttx-right">
    <ol class="breadcrumb ttx-bread">
         <li class="active">全部影片</li>
    </ol>
    <div class="row ttx-movie-container">

    </div>
    <nav aria-label="...">
        <ul class="pagination ttx-my-number">
                          
        </ul>
     </nav>
</div>
```
***
**解析**

此次样式上利用了[boostrap框架](http://v3.bootcss.com/ "boostrap")，js上利用的是[jqPaginator插件](http://jqpaginator.keenwon.com/ "jqPaginator")。

     axios.post('/allMovies').then(function (ans) {}

axios前端向后端('/allMovies')路由post数据，then()里的函数是数据接收后的回调函数，ans是接受的数据，类型是对象，ans的data属性的值是数组


    let mynum = parseInt((ans.data.length/16))+1;

求出ans的data属性值的长度

    $('.ttx-my-number').jqPaginator({}）
利用jquery方法，此为给**class**为*ttx-my-number*调用一个js函数

        totalPages: mynum,
        visiblePages: 20,
        currentPage: 1,
总页数为后台传来的数据mynum，分页的总页数为20,当前页码为1

     onPageChange: function (num, type) {}
回调函数，当换页时触发（包括初始化第一页的时候），会传入两个参数：

1、“目标页"的页码，Number类型

2、触发类型，可能的值：“init”（初始化），“change”（点击分页）

    let mycurrentnum = (num-1)*16;
\*16代表每页有16个电影，**mycurrentnum**表示点击后目标页后所需要加载的第一个数据

    myendnum = num*16 - 1;
**myendnum**代表点击目标页数所需要加载的最后一个数据（电影）

    if(myendnum > ans.data.length - 1){
                myendnum = ans.data.length - 1;
            }
如果目标页所需要加载的最后一个数据大于后台提供的数据，则最后一个数据就是后台提供的最后一个数据。

    for (let i = mycurrentnum; i <=myendnum; i++) {}
表示加载点击目标页第一个数据到最后一个数据

    str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
第一层div：加样式

    <a onclick="myonclickhrf(${ans.data[i].id})">
         <img class="center-block ttx-movie-photo" src="$  {ans.data[i].movieimg}" width="65%" height="100%" alt="">
    </a>
第二层div： 添加图片，图片也是一个链接

    <p class="ttx-movie-text">
         <a onclick="myonclickhrf(${ans.data[i].id})" >${ans.data[i].name}</a>
             <strong>${ans.data[i].score}</strong>
    </p>

第三层div: 添加文字描述，文字也是链接

    $(".ttx-movie-container").empty().append(str);

jquery方法：取**class**为*ttx-movie-container*，[empty()](http://www.w3school.com.cn/jquery/jquery_dom_remove.asp)将原本属于*ttx-movie-container*的子节点以及其文本内容清除（不包括本身），[append()](http://www.w3school.com.cn/jquery/jquery_dom_add.asp)为*ttx-movie-container*添加刚刚动态创建的新节点和内容。

### 总结：

先向后台取回所有数据，点击目标页后，先清空页面上的已有数据后加载目标页所需要的第一个到最后一个数据，分页完毕。做到了页面部分刷新，且不用多次请求数据。
* * *

### 扩展：

可以延伸一些小功能，如：

**按输入页数查询：**

可以在

     <nav aria-label="..."> </nav>
后添加一个input的搜索框，前端取得数据后将输入结果赋给**mycurrentnum**

**让用户控制页数**

也可添加一个input输入框，将\*16的16作为传入参数**cout（自定义）**，前端取得数据后将输入结果赋给**cout**





