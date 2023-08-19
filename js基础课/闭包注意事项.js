function outer(){
    let v = 'sth'

    return function (){
        console.log(v)
    }
}

function sum(){
    let sum = 0
    for(let value of arguments)
        sum += value
    return sum
}
const result = sum(1,2,4,6)
console.log(result)