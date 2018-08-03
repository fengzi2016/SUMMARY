/*Publish / Subscribe模式（发布/订阅）
/ topics =  {
   topic1: [
        {token:token,func:func},
        {token:token,func:func}
    ],
   topic2:  [...]
 } 
 每个数组是一个主题topic
*/
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

/*Mediator （中介模式）
    基本实现： topics = {
        "topic1":[{context:context,callback:fn},...],
        ...
    }
*/
var mediator = (function() {
    var topics = [];
    var subscribe = function(topic, fn) {
        if(!topics[topic]){
            topics[topic] = [];
        }
        topics[topic].push({context:this,callback:fn});
        return this;
    }
    var publish = function(topic) {
        if(!topics[topic]) {
            return false;
        }
        let args ;
        args = Array.prototype.slice.call(arguments,1);
        topics[topic].forEach(t => {
            t.callback.apply(t.context,args);
        });
        return this;
    }
    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    }
} 

)()





/*
中介模式
高级实现
构造函数：Subscriber (fn, optios, context) => {
    fn: fn,
    options: options,
    topic: null,
    context: context,
    id: id
}
构造函数（生成topic实例）： Topic (namespace) => {
    namespace: namspace,
    _callbacks: [
        new Subscriber(),
        ..
    ],
    _topics: [],
    stopped: false,
    addSubscriber: (fn, options, context) => { this._callbacks.push(new Subscriber());},
    getSUbscriber: (identifier) => { identifier === this._callbacks[x].id || this._callbacks[x].fn; return this._callbacks[x];}
    addTopic: (topic) => { return new Topic(this.namespace?this.namspace+":"::""+topic);}
    removeSubscribe: (identifier) => {identifier === this._callbacks[x].id || this._callbacks[x].fn; this._callbacks[x].topic = null; delete this._callbacks[x];}
    Pulish: (data) => {Iterator topic[j]  : Iterator this._callbacks[i].fn.apply(this._callbacks[i].context, data)}
}
*/



/*
Prototype 原型模式
1. 使用Object.create()实现
 */
let vehicle = {
    getModel: function() {
        console.log(`the model of this vehicle is ${this.model}` )
    }
};
let car = Object.create(vehicle, {
    "id":{
        value: MY_GLOBAL.nextId(),
        enumerable:true,//默认false
        //默认writable: false 
        //默认configurabel: false
    },
    "model": {
        value:'Ford',
        enumerable:true
    }
})

/*
2. 不用Object.create()
但是不允许用户用同样的方式定义只读属性
*/
let vehiclePrototype = {
    init: function(carModel) {
        this.model = carModel;
    },
    getModel: function() {
        console.log(`the model of this vehicle is ${this.model}`);
    }
}
function vehicle(model) {
    function F(){};
    F.prototype = vehiclePrototype;
    let f = new F();
    f.init(model);
    return f;
}

/*
Command（命令）模式
有点像 java里的interface接口
 */

 let command = (function() {
     let carManager = {
         responseInfo: function(){},
         buyVehicle: function(){},
         arrangeView:function(){}
     }
     return carManager;
 })();
//接受任意可以在command对象上执行的方法，传递可使用的任意数据
command.exec = function(name) {
    return command[name]&&command[name].apply(command,Array.prototype.slice.call(arguments,1));
}

command.exce("responseInfo","1","2");
command.exce("buyVehicle","1","2");
command.exce("arrangeView","1","2");

/*
Facade（外观）模式
为更大的代码提供一个方便的高层次接口，能够隐藏其底层的真实复杂性
 */
let module = (function() {
    let _private = {
        i : 5,
        get : function() {
            return this.i;
        },
        set : function(value) {
            return this.i = value;
        },
        run : function() {
            console.log(`running`);
        },
        jump: function() {
            console.log(`jumping`);
        }
    };
    return {
        facade: function(args) {
            _private.set(args.value);
            _private.get();
            if(args.run) {
                _private.run();
            }
        }
    };
})();
module.facade({run:true,value:10});

/*
Factory工厂模式
使用场景：
    1. 当对象或组件设置涉及高复杂性时
    2. 当需要根据所在的不同环境轻松生成对象的不同实例时
    3. 当处理很多共享相同属性的小型对象或组件时
    4. 在编写只需要满足一个API契约的其它对象的实例对象时
 */
function Car(options) {
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silver";
};
function Truck(options) {
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";
}
function VehicleFactory() {}
VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function(options) {
    if(options.vehicleType === `car`) {
        this.vehicleClass = Car;
    } else {
        this.vehicleClass = Truck;
    }
    return new this.vehicleClass(options);
}
let carFactory = new VehicleFactory();
let car  = carFactory.createVehicle({
    vehicleType:`car`,
    color:`yellow`,
    door:6
})
let movingTruck = carFactory.createVehicle({
    vehicleType:`truck`,
    state:`like new`,
    color:`red`,
    wheelSize:`small`
})
//将VehicleFactory归入子类创造一个Truck工厂
function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;
let truckFactory = new TruckFactory();
let myTruck = truckFactory.createVehicle({
    state: `ok`,
    color: `pink`,
    wheelSize: `so big`
})
console.log(myTruck instanceof Truck)//true


/*
Abstract Factory
抽象工厂
*/
let AbstractVehicleFactory = (function() {
    let types = {};
    return {
        getVehicle : function(type, customizations) {
            let Vehicle = types[type];
            return (Vehicle) ? new Vehicle(customizations) : null;
        },
        registerVehicle : function(type, Vehicle) {
            let proto = Vehicle.prototype;
            // 只注册满足契约条件的类
            if(proto.drive && proto.breakDown) {
                types[type] = Vehicle;
            }
            return AbstractVehicleFactory;
        }
    };
})()