// const func = (intervals)=>{
//     let res = [], left = intervals[0][0], right = intervals[0][1]
//     intervals.sort((a,b)=>(a[0]-b[0]))
//     for(let i = 1; i<intervals.length; i++){
//         if(intervals[i][0]<=right){
//             right = intervals[i][1];
//         }else{
//             res.push(new Array(left, right))
//             left = intervals[i][0];
//             right = intervals[i][1];
//         }
//         if(i == intervals.length-1){
//             res.push(new Array(left, right))
//         }
//     }
//     return res
// }
// let intervals = [[1,4],[4,5]]
// console.log(func(intervals))

// console.log(Number.isNaN('123')) // false
// console.log(Number.isNaN('abc')) // false
// console.log(Number.isNaN(true)) // false
// console.log(Number.isNaN(123)) // false
// console.log(Number.isNaN(null)) // false


// console.log(isNaN('123')) // false
// console.log(isNaN('abc')) // true
// console.log(isNaN(true)) // false
// console.log(isNaN(123)) // false
// console.log(isNaN(null)) // false

console.log(!isNaN(parseFloat(value)) && isFinite(value))