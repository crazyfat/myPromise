let a = '全局变量a'
function fn1() {
    console.log(a)
}

function fn2(){
    let a = 'fn2中的a'
    fn1()
}
fn2()
