class Person {
    name
    age

    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayhello(){
        console.log('say')
    }
}
const ming = new Person('ming', 19)
const li = new Person('li', 90)
ming.sayhello()

class Asian extends Person(){
    sayhello() {
        super.sayhello();
    }
}

console.log(li)