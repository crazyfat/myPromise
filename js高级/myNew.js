function myNew(...args) { // 用可变参数替代argument
    let obj = {} //1、创建一个空对象
    let Constructor = args.shift()
    obj.__proto__ = Constructor.prototype //2、将空对象的隐式原型指向构造函数的原型
    Constructor.apply(obj, args) //3、将构造函数的this指向当前空对象并指向
    return obj //返回该对象
}
function Person(name, age){
    this.name = name
    this.age = age
    this.say = function (){
        console.log('hi')
    }
}
Person.prototype.sorry = function (){
    console.log('sorry!')
}
let obj = myNew(Person, 'zhangsan', 20)