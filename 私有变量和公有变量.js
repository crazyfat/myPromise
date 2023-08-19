function Person(_name){
    const name = _name;
    this.get = function get_name() {
        return name
    }
}
const p1 = new Person('111')
const p2 = new Person('222')
console.log(p1.get())
console.log(p2.get())