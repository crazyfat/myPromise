async function fn(){
    // return 1
    throw 2
}
const result = fn()
result.then(
    value => {},
    reason => { console.log('onRejected():', reason)}
)