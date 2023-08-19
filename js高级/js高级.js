// function Fn(){
//     this.test1 = function (){
//         console.log('test1')
//     }
// }
// console.log(Fn.prototype)
// Fn.prototype.test2 = function () {
//     console.log('test2')
// }
// // console.log(Function.prototype.__proto__)
// console.log(typeof Function.prototype) // function
// console.log(typeof Object.prototype) // object
// console.log(Object.prototype instanceof Object) //false 这里回顾instanceof的原理。在左侧的原型链上查找，
// // 但是Object.prototype.__proto__指向null，所以返回了false，但实际上左侧是Object的实例
// console.log(Function.prototype instanceof Object) //true
let a = 'this a string'
let b = new String('this string b')
console.log(a)
console.log(b)