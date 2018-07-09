//Publish / Subscribe模式（发布/订阅）
// topics =  {[{token,func},{token,func}],[...]} 
// 每个数组是一个主题topic
let pubsub = {};
(function (q) {
    let topics = {};
    let subid = -1;
    q.publish = function (topic,args) {
        if(!topics[topic]) {
            return false;
        }
        let subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        while(len--) {
            subscribers[len].func(topic,args);
        }
        return this;
    }
    q.subscribe = function (topic,func) {
        if(!topics[topic]) {
            topics[topic] = [];
        }
        let token = (++subid).toString();
        topics[topic].push({
            token:token,
            func:func
        });
        return token;
    }
    q.unsubscribe = function (token) {
        for(let i in topics) {
            if(topics[i]) {
                topics[i] = topics[i].filter((suscriber)=>{
                    return suscriber.token!==token;
                })
            }
        }
        return this;
    }
})(pubsub);

//使用上面模式

let messageLogger = function(topics,data) {
    console.log('Logging:'+topics + ':' + data);
}
let subscription = pubsub.subscribe("inbox/newMessage",messageLogger);
pubsub.publish("inbox/newMessage","hello, world");
pubsub.publish("inbox/newMessage",['test','a','b','c']);
pubsub.publish('inbox/newMessage',{
    sender:'hello@google.com',
    body:"hey again"
})
pubsub.unsubscribe( subscription );
pubsub.publish("index/newMessage",'hello,are you still there?')


// Observer例子：Observer.html

// Singleton单例模式
let mySingleton = (function () {
    let instance;
    function init() {
        function privateMethod () {
            console.log('i am private');
        }
        let privateVariable = 'i am also private';
        let privateRandomNumber = Math.random();
        return {
            publicMethod : function () {
                console.log('i am publicMethod');
            },
            publicProperty: 'i am also public',
            getRandomNumber : function () {
                return privateRandomNumber;
            }
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