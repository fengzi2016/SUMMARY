# 查询功能总结

## 本次项目查询功能我们小组实现了“分类查询”，“模糊查询”，“分类后模糊查询”，其中有一些需要学习的地方，以后可能会常用

***
##  源码如下：
**前端JS部分**
```
$(document).ready(function () {
    $('.cr-mysubmit').on('click',function () {
       let myselect = $('.cr-search-select').find("option:selected").html();
       let myinput  = $('.cr-myinput').val();
       if(myinput){
           if(myselect === '全部电影'){
               $.post('/oneSearchResult',{moviename:myinput},function (ans) {
                   if(ans){
                       let str = '';
                       for (let i = 0; i < ans.length; i++) {
                           str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                           str += `<a onclick="myonclickhrf(${ans[i].id})"><img class="center-block ttx-movie-photo" src="${ans[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                           str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans[i].id})" >${ans[i].name}</a><strong>${ans[i].score}</strong></p>`;
                           str += `</div>`;
                       }
                       $(".ttx-movie-container").empty().append(str);
                   }
               });
           }else {
               $.post('/searchResult',{comment:myselect,moviename:myinput},function (ans) {
                   if(ans){
                       let str = '';
                      for (let i = 0; i < ans.length; i++) {
                           str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                           str += `<a onclick="myonclickhrf(${ans[i].id})"><img class="center-block ttx-movie-photo" src="${ans[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                           str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans[i].id})" >${ans[i].name}</a><strong>${ans[i].score}</strong></p>`;
                           str += `</div>`;
                       }
                       $(".ttx-movie-container").empty().append(str);
                   }
               });
           }
       }else {
           return bootbox.alert("请填写电影名称!");
       }

    });
```

**后端服务器部分**

```
//获得一个电影的搜索结果
app.post("/oneSearchResult",urlencodedParser, function (req, res) {
    let moviename=req.body.moviename;
    req.models.T_movie.find({name:orm.like("%"+moviename+"%")}, function (err, movies) {
        if (err) throw err;
        res.send(movies);
    });
});
/*得到这个电影名称的搜索结果 OK*/
app.post("/searchResult",urlencodedParser, function (req, res) {
    let moviename=req.body.moviename;
    let comment=req.body.comment;
    req.models.T_movie.find({name:orm.like("%"+moviename+"%"),comment:orm.like("%"+comment+"%")}, function (err, movies) {
        if (err) throw err;
        res.send(movies);
    });
});
```
**html部分**
```
<div class="navbar-form navbar-right">
    <div class="form-group">
        <select class="form-control cr-search-select " id="comment">
             <option role="presentation"><a href="#">全部电影</a></option>
         </select>
         <input type="text" class="form-control cr-myinput" placeholder="搜索电影">
    </div>
     <button  class="btn btn-default cr-mysubmit" >
        <span class="glyphicon glyphicon-search">
        </span>
    </button>
</div>
```
***
1. **获取下拉列表已经选中的值**
```
     let myselect = $('.cr-search-select').fin("option:selected").html();
```
2. **获取输入框值**
```
    let myinput  = $('.cr-myinput').val();
```
3. **清空原有元素，加载动态创建元素**
```
     $(".ttx-movie-container").empty().append(str);
```
4. **搜索一条数据，模糊搜索**
```
    req.models.T_movie.find({name:orm.like("%"+moviename+"%")}, function (err, movies) {
        if (err) throw err;
        res.send(movies);
    });
```
5. **种类加模糊搜索**
```
数据发送： {comment:myselect,moviename:myinput}

后台接收： req.models.T_movie.find({name:orm.like("%"+moviename+"%"),comment:orm.like("%"+comment+"%")}, function (err, movies) {
        if (err) throw err;
        res.send(movies);
    });
});
```