//发布，订阅模式
let pubsub = {};
(function (q) {
    let topics = {};
    let subid = -1;
    q.publish = function(topic, args) {
        if(!topics[topic]) {
            return false;
        }
        let subscribers = topics[topic];
        let len = subscribers ? subscribers.length : 0;
        while(len --) {
            subscribers[len].func(topic,args);
        } 
        return this;
    }
    q.subscribe = function(topic, func) {
        if(!topics[topic]) {
            topics[topic] = [];
        } 
        let token = ++subid;
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    }
    q.unsubscribe =  function(token) {
        for(let i in topics) {
            if(topics[i]) {
                topics[i] = topics[i].filter((s)=>{
                  return  s.token !== token;
                })
            }
        }
        return this;
    }
})(pubsub)



// 单例模式
let mySingleton = (function (){
    let instance ;
    function init() {
        /*各种初始化方法和变量 */
        return {
            /*对外接口: */
            /*可以暴露出的方法和变量 */
        }
    }
    return {
        getInstance : function() {
            if(!instance) {
                instance = init();
            }
            return instance;
        }
    }

})();


//中介模式
let mediator =  (function(){
    let topics = {};
    let subscribe = function(topic,fn) {
        if(!topics[topic]) {
            topics[topic] = [];
        }
        topics[topic].push({context:this,callback:fn});
        return this;
    }
    let publish = function(topic) {
        if(!topics[topic]) {
            return false;
        }
        let args;
        args =  Array.prototype.slice.call(arguments,1);
        topics[topic].forEach(t => {
            t.callback.apply(t.context,args);
        });
        return this;
    }
    return {
        publish:publish,
        subscribe:subscribe,
        installTo:function(obj) {
            obj.subscribe = subscribe
            obj.publish = publish
        }
    }
})()