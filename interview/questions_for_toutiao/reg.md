题目描述： 有一个div容器，容器中的内容如下

<div id="jsContainer">
    这里会，给出一段随机文本，可能包含一些链接，比如https://www.baidu.com，或者 www.baidu.com?from=onlineExam，如果出现链接文本，请给该链接文本加上链接标签，用户点击后能直接在新窗口中打开该链接。
</div>

实现link函数，要求： 

（1）jsContainer中不能包含有其他的dom 元素 

（2）将文本中的以http、https或是是www开头的链接加上链接标签，同时www开头的链接地址要加上http协议。 

（3）点击链接时，在新窗口中打开。

```html
    <html>
    <body>
        <div id="jsContainer">
            这里会，给出一段随机文本，可能包含一些链接，比如https://www.baidu.com，或者 www.baidu.com?from=onlineExam，如果出现链接文本，请给该链接文本加上链接标签，用户点击后能直接在新窗口中打开该链接。
        </div>
    </body>
    <script>
        let dom = document.getElementById('jsContainer');
        let text = dom.textContent;
        let addHttp = text.replace(/[^\/](www[^，]*)/g,'http://$1');
        let httpsText = addHttp.replace(/(([a-z]*[:\/]*)?www[^，]*)/g,'<a target="_blank" href=$1 >$1</a>')
        dom.innerHTML = httpsText;
    </script>
</html>
```