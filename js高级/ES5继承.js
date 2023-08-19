// function Father(){
//     this.name = 'father'
// }
// Father.prototype.say = function () {
//     console.log(`hi i am ${this.name}`)
// }
// function Son(){
//     this.name = 'son'
// }
// Son.prototype = new Father()
// console.log(Son.prototype.constructor)
// Son.prototype.constructor = Son
// console.log(Son.prototype.constructor)
// Son.prototype.cry = function () {
//     console.log('wuwuwu')
// }
// const kid = new Son()
// kid.cry()
// kid.say()

function Father(name) {
    this.name = name
    this.father_func = function(){
        console.log(this.name+'hhh')
    }
}
function Son(name){
    Father.call(this, name)
}
const kid = new Son('son')
kid.father_func()