// 函数执行上下文
function func(a1){
    console.log(a1)
    console.log(a2)
    console.log(a3)
    a3()
    var a2 = 2
    function a3() {
        console.log('a3')
    }
}
func(3)