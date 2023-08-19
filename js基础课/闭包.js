function f() {
    let num = 0

    const add = function () {
        num++
        console.log(num)
    }
    add(num)
}
// 每次重新执行f()，num又被初始化为0了
f()
f()
f()
//1 1 1

function f() {
    let num = 0
    return ()=>{
        num++
        console.log(this)
    }
}
// 这里return一个闭包，以及在此闭包中的一个function
const func = f()
// 因此接下来每次执行func，都是在同一个闭包环境中执行
func()
func()
func()
// 1 2 3