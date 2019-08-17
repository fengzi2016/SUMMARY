
    // 适用于静动态加载
    function getBasePath() {
        // 通过javascript error 快速定位模块地址
        try {
            a.b.c()
        } catch(e) {
            var m = null;
            if(e.fileName) {
                // firefox
                return e.fileName;
            } else if(e.sourceURL) {
                // safari
                return e.sourceURL;
            }else if(e.stacktrace){
                //opera9
                    m = e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m);
                    if (m && m[1]) {
                        return m[1];
                    }     
                }else if(e.stack){//chrome 4+
                    m= e.stack.match(/\(([^)]+)\)/)
                    if (m && m[1]) {
                         return m[1];
                    }
                }
        }
        // 通过DOM定位模块地址
        var nodes = document.getElementsByTagName("script");
        // 根据IE唯一支持的属性判断是否是IE
        if(window.VBArray) {
            for(var i = 0,node; node=nodes[i++]; ){
                // 如果脚本未执行
                if(node.readyState === 'interactive') {
                    break;
                }
            }
        } else {
            node = nodes[node.length - 1];
        }
        // 根据是否有 document.querySelector来判断是否是IE8以前
        const src = document.querySeletor ? node.src : node.getAttribute('src', 4);
        return src;
    }
const url = getBasePath();
console.log(url);
// file:///Users/guanyunfeng/workspace/github/summary/summary/share/javascript/loader.js:6:13
const BasePath =  url.replace(/[?#].*/,"").slice(0, url.lastIndexOf("/")+1);
// file:///Users/guanyunfeng/workspace/github/summary/summary/share/javascript/
