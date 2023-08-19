// 1、以函数形式调用
function f() {
    console.log('函数形式调用： ', this)
}
const obj = {
    name:'obj',
    func(){
        console.log('方法形式调用： ', this)
    }
}
function f1() {
    console.log('以构造函数形式调用： ', this)
}
const obj2 = {
    name:'obj2',
    func : ()=>{
        console.log('构造函数中： ', this)
    }
}

f()
obj.func()
const o1 = new f1()
obj2.func()
