const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
/*
promise构造函数
executor:执行器函数（同步执行）
*/
function Promise(executor) {
    // 将当前promise对象保存起来
    const that = this
    that.status = PENDING //给promise指定status属性，初始为pending
    that.data = undefined   //给promise对象指定一个用于存储结果数据的属性
    that.callbacks = []     //存储回调函数：因为可能先指定了回调，然后再修改状态执行回调
                            //每个元素的结构：{ onResolved(), onRejected() }
    // 立即同步执行执行器函数 executor
    function resolve(value) {
        // 状态只能改一次，如果不是pending，则直接return
        if(that.status !== PENDING)
            return;
        // 将状态改为resolved
        that.status = RESOLVED
        // 保存value数据
        that.data = value
        // 如果由待执行的callback函数，立即异步执行回调函数 onResolved
        if(that.callbacks.length>0){
            setTimeout(()=>{ // 放入异步队列中执行所有成功的回调
                that.callbacks.forEach(calbacksObj => {
                    calbacksObj.onResolved(value)
                })
            })
        }
    }
    function reject(reason) {
        // 状态只能改一次，如果不是pending，则直接return
        if(that.status !== PENDING)
            return;
        // 将状态改为resolved
        that.status = REJECTED
        // 保存value数据
        that.data = reason
        // 如果由待执行的callback函数，立即异步执行回调函数 onRejected
        if(that.callbacks.length>0){
            setTimeout(()=>{ // 放入异步队列中执行所有成功的回调
                that.callbacks.forEach(calbacksObj => {
                    calbacksObj.onRejected(reason)
                })
            })
        }
    }

    try{
        executor(resolve, reject)
    } catch (error){ // 如果执行器抛出异常，promise对象则变为失败状态
        reject(error)
    }
}
/*
Promise原型对象的then()方法
指定成功和失败的回调函数
返回一个新的promise对象
*/
Promise.prototype.then = function (onResolved, onRejected){
    const that = this

    // 返回一个新的promise对象
    return new Promise((resolve, reject)=>{
        /*
        调用指定的回调函数处理
         */
        function handle(callback) {
            try{
                const result = callback(that.data)
                if(result instanceof Promise){
                    // 如果成功的回调返回一个promise，那么通过调用其.then得到promise返回的结果
                    result.then(
                        value => resolve(value),
                        reason => reject(reason)
                    )
                    //可以简写成以下形式：因为
                    // resolve.then(resolve, reject)
                }else{
                    resolve(result)
                }
            } catch(error){
                reject(error)
            }
        }

        // 如果处于pending状态指定了回调函数，则要等待状态改变，先存储回调函数
        if(that.status == PENDING)
            that.callbacks.push({ // 这里push进去一个对象，这是对象的两个函数
                // 不能这么写，这么写的话就变成了一个属性
                // onResolved:handle(onResolved),
                // value是形参
                onResolved:function (value) {
                    handle(onResolved)
                },
                onRejected:function (value){
                    handle(onRejected)
                }
            })
        else if(that.status = RESOLVED){
            // 如果当前promise处于成功状态，那么执行成功的回调，.then返回的新promise取决于回调的结果
            setTimeout(()=>{
                /*
                如果抛出异常，return的promise就会失败，reason就是error
                如果回调函数执行返回非promise，return的promise就会成功，value就是成功的值
                如果回调函数执行返回promise，return的promise的结果就是这个promise的结果
                 */
                handle(onResolved)
            })
        }else{
            // 如果当前promise处于失败状态，那么执行失败的回调，.then返回的新promise取决于回调的结果
            setTimeout(()=>{
                handle(onRejected)
            })
        }
    })
}
/*
Promise原型对象的then()方法
指定失败的回调函数
返回一个新的promise对象
*/
Promise.prototype.catch = function (onRejected){
    return this.then(undefined, onRejected)
}
/*
Promise函数对象的resolve()方法
返回一个成功的promise对象，值为value
*/
Promise.resolve = function (value) {

}
/*
Promise函数对象的reject()方法
返回一个失败的promise对象，值为reason
*/
Promise.reject = function (reason) {

}
/*
Promise函数对象的all()方法
返回一个promise对象, 只有所有promise都成功才成功，否则失败
*/
Promise.all = function (promises){

}
/*
Promise函数对象的race()方法
返回一个promise对象，其结果由第一个完成的promise决定
*/
Promise.race = function (promises){

}


const p = new Promise((resolve, reject)=>{
    try{
        setTimeout(()=>{
            // !!!注意此处调用resolved的是windows对象，而不是通过promise调用的
            // setTimeout里抛出的异常没法直接捕获
            resolve(11)
        }, 1000)
    } catch(error){
        throw error
    }

}).then(
    value => {
        console.log('onResolved1()', value)
        throw 444
    },
    reason => {
        console.log('onRejected1()', reason)

    }
).then(
    value => {
        console.log('onResolved2()', value)
    },
    reason => {
        console.log('onRejected2()', reason)
        throw 555

    }
).catch((reason)=>{
    console.log('onRejected3()',reason)
})