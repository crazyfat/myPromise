function Father(name, age) {
    this.name = name
    this.age = age
    this.getName = function () {
        console.log(`my name is ${this.name}`)
    }
}
Father.prototype.say = function () {
    console.log('hhh, my age is '+this.age)
}


function Son(name, age){
    Father.call(this, name, age)
    this.score = '99'
}
Son.prototype = new Father()
Son.prototype.constructor = Son
Son.prototype.cry = function () {
    console.log(`${this.name} is crying`)
}
const kid = new Son('lisi', 8)
kid.getName()
kid.say()
kid.cry()
