//1.原型链继承：核心 ：子类的prototype = 父类的实例
function Parent() {
    this.prototype = true;
}
Parent.prototype.getParentValue = function() {
    return this.prototype;
}

function Child() {
    this.ChildProperty = false;
}
Child.prototype = new Parent();
Child.prototype.getChildValue = function() {
    return this.ChildProperty;
}

//问题： 包含引用类型的原型
//例子:
function Parent() {
    this.colors = ['red','blue','green'];
}
function Child(){}
Child.prototype =  new Parent();
var instance1 = new Child();
var instance2 = new Child();
instance1.colors.push('black');
console.log(instance1.colors);//['red','blue','green','black']
console.log(instance2.colors)//['red','blue','green','black']



//2. 构造函数继承
function Parent(name) {
    this.colors = ['red','blue','green'];
    this.name = name;
}
function Child(){
    //还可以传递参数
    Parent.call(this,'sss');
}
Child.prototype =  new Parent();
var instance1 = new Child();
var instance2 = new Child();
instance1.colors.push('black');
console.log(instance1.colors);//['red','blue','green','black']
console.log(instance2.colors)//['red','blue','green']
console.log(instance1.name) // sss


//3.组合继承(原型链+构造函数)
function Parent(name) {
    this.name = name
  this.colors = ['red','blue', 'green']
}
Parent.prototype.sayName = function() {
    console.log(this.name)
}
function Child(name,job) {
    Parent.call(this,name);
    this.job = job;
}

Child.prototype = new Parent()
Child.prototype.constructor = Parent
Child.prototype.sayJob = function() {
    console.log(this.job)
}

var instance1 = new Child('Jiang', 'student')
instance1.colors.push('black')
console.log(instance1.colors) //[“red”, “blue”, “green”, “black”]
instance1.sayName() // 'Jiang'
instance1.sayJob()  // 'student'
var instance2 = new Child('J', 'doctor')
console.log(instance2.colors) // //[“red”, “blue”, “green”]
instance2.sayName()  // 'J'
instance2.sayJob()  // 'doctor'



//4. 原型式继承 本质上来说，object对传入其中的对象执行了一次浅复制
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
var person = {
    name: 'Jiang',
    friends: ['Shelby', 'Court']
  }
var anotherPerson = object(person)
console.log(anotherPerson.friends)  // ['Shelby', 'Court']

//5. Object.create()方法
var person = {
    name:'Jiang',
    friends:['Shelby','Court']
}
var anotherPerson = Object.create(person)
console.log(anotherPerson.name) //Jiang

//6. 寄生式继承，即创建一个仅用于封装继承过程的函数
function createAnother(o) {
    var clone = Object.create(o);
    clone.sayHi = function() {
        console.log('hi')
    }
    return clone;
}
var person = {
    name:'Jiang'
}
var anotherPerson = createAnother(person);
anotherPerson.sayHi()


//7. 寄生组合模式
function inheritPrototype(Child,Parent) {
    var prototype = Object.create(Parent.prototype);
    prototype.constructor = Child;
    Child.prototype = prototype;
}
function Parent(name) {
    this.name = name;
    this.colors = ['red']
}

Parent.prototype.sayName = function() {
    console.log(this.name)
}
function Child (name,job) {
    Parent.call(this)
    this.job = job
}
inheritPrototype(Child, Parent)
var instance = new Child('Jiang', 'student')
instance.sayName()


//inheritPrototype函数可以用Object.create()代替
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child;

//用Object.setPrototypeOf
Object.setPrototypeOf(Child.prototype,Parent.prototype)
console.log(Child.prototype.constructor === Child) //true