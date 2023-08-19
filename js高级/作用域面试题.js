// var x = 10
// function func(x){
//     console.log(x)
// }
// function show(f){
//     var x = 20
//     f()
// }
// show(func)


//题目2
// var fn = function (){
//     console.log(fn)
// }
// fn()
// fn = 10
// obj = {
//     fn:2,
//     fn2:function () {
//         console.log(fn)
//     }
// }
// obj.__proto__.fn = 222
// obj.fn2()

function Person(){
    var fn = 10
}
var p = new Person()
p.func = function () {
    console.log(fn)
}
p.func()