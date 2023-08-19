function F(){}
F.prototype.a = function(){
    console.log('F.prototype a')
}
Function.prototype.a = function(){
    console.log('Function a')
}
F.a()