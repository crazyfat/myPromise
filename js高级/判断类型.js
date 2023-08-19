// const a = 10
// let b = a
// b = 20
// console.log(a)
let a = {
    name:'1'
}
function func(obj) {
    obj.name = '2'
}
func(a)
console.log(a)