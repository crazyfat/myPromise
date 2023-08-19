// console.time("time")
// setTimeout(function fn(){
//     console.timeEnd('time')
//     console.log("XXX")
//     console.time('time')
//     setTimeout(fn, 1000)
// }, 1000)
// let a = 10
// console.log(`a length:${a}`)
// const map = new Map()
// for(let i = 0; i<5; i++){
//     map.set(i, Math.pow(i, 2))
// }
// for(let item of map)
//     console.log(item)
//
// for(let key of map.keys())
//     console.log(key)
//
// map.forEach((val, key)=>{
//     console.log(`key:${key}, value:${val}`)
// })
function f() {
    console.log("xxx")
}
let interval = 1000
setTimeout(function fn() {
    f()
    setTimeout(fn, interval)
}, interval)