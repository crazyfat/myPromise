function Person(color){
    console.log(this)
    this.color = color
    this.getColor = function () {
        console.log(this)
        return this.color
    }
    this.setColor = function(color){
        console.log(this)
        this.color = color
    }
}
Person('1') //this是window
let p = new Person('2') //this是p
// p.getColor()