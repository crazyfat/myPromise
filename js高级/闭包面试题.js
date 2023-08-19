var name  = 'window'
var obj = {
    name:"obj",
    getName:function (){
        return ()=>this.name
    }
}
console.log(obj.getName()())

var name2  = 'window'
var obj2 = {
    name:"obj",
    getName:function (){
        var that = this
        return function () {
            return that.name
        }
    }
}
console.log(obj2.getName()())