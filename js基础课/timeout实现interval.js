// let num = 1
// function myInterval(func, interval) {
//     func()
//     setTimeout(()=>{
//         myInterval(func, interval)
//     }, interval)
// }
//
// myInterval(()=>{
//     console.log(num++)
// }, 100)
// 闭包的形式实现
// function print() {
//     let num = 1
//     const f = ()=>{
//         console.log(num++)
//     }
//     function myInterval(interval){
//         f()
//         setTimeout(()=>{
//             myInterval(interval)
//         }, interval)
//     }
//     return myInterval
// }
// const func = print()
// func(100)
// console.log(num)

function myInterval(fn, interval) {
    fn()
    setTimeout(()=>{
        myInterval(fn, interval)
    }, interval)
}
function fn() {
    console.log("xxx")
}
console.log(typeof fn)
myInterval(fn, 1000)
