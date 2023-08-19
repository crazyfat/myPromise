// 自定义的promise模块:IIFE(立即调用函数表达式）
(function (window) {
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
    返回promise对象的结果由onResolved和onRejected的执行结果决定
     */
    Promise.prototype.then = function (onResolved, onRejected){
        const that = this
        // 指定回调函数的默认值（必须是函数）
        // 如果是一个值，则将这个值向下传递，将这个值封装成返回这个value的一个函数
        onResolved = typeof onResolved==='function' ? onResolved : value => value
        onRejected = typeof onRejected==='function' ? onRejected : reason => {throw reason}
        // 返回一个新的promise对象
        return new Promise((resolve, reject)=> {
            function handle(callback) {
                /*
                执行指令的回调函数
                根据执行的结果改变return 的promise状态

                返回promise对象的结果由onResolved和onRejected的执行结果决定:
                1.抛出异常，返回失败，reason为异常
                2.onResolved返回promise，则当前promise的状态为返回promise的状态
                 */
                try{
                    const result = callback(that.data)
                    if(result instanceof Promise){
                        // 如何知道result的结果？ 通过.then调用
                        result.then(
                            value => {resolve(value)},
                            reason => {reject(reason)}
                        )
                        // result.then(resolve, reject)
                    }
                } catch(error){
                    reject(error)
                }
            }

            // 当前对象的状态是resolved，立即异步执行成功的回调
            if(that.status==RESOLVED){
                setTimeout(()=>{
                    handle(onResolved)
                }, 100)
            // 当前对象的状态是rejected
            }else if(that.status==REJECTED){
                setTimeout(()=>{
                    handle(onRejected)
                })
            // 当前对象的状态是pending
            }else{
                that.callbacks.push({
                    onResolved(){
                        handle(onResolved)
                    },
                    onRejected(){
                        handle(onRejected)
                    }
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
        this.then(undefined, onRejected)
    }
    /*
    Promise函数对象的resolve()方法
    返回一个成功的promise对象，值为value
    */
    Promise.resolve = function (value) {
        // 返回一个promise 可能成功可能失败
        return new Promise((resolve, reject)=>{
            // value是promise
            if(value instanceof Promise){
                value.then(
                    value => {resolve(value)},
                    reason => {reject(reason)}
                )
            }else{
                resolve(value)
            }
        })
    }
    /*
    Promise函数对象的reject()方法
    返回一个失败的promise对象，值为reason
    */
    Promise.reject = function (reason) {
        // 返回一个失败的promise
        return new Promise((resolve, reject)=>{
            reject(reason)
        })
    }
    /*
    Promise函数对象的all()方法
    返回一个promise对象, 只有所有promise都成功才成功，否则失败
    */
    Promise.all = function (promises){
        const values = new Array(promises.length) // 用来保存所有成功value的数组
        let resolvedCount = 0 // 用来保存成功的promise的数量
        return new Promise((resolve, reject)=>{
            // 遍历获取每一个promise的结果
            promises.forEach((p, index)=>{
                //p也有可能不是promise,因此用Promise.resolve包装，若是数值则返回成功promise，若是promise则状态传递
                Promise.resolve(p).then(
                    value => { // 将成功的value保存到数组里去

                        // 此处不用push而是用下标，这是因为forEach时这个p可能处于Pending,then异步执行，结果存入
                        // values的操作被放入回调队列，而后续的p可能已经完成了（即状态确定）就先执行onResolved()
                        // 等到先前这个p的状态确定了，再回来执行这个p的回调，此时就只能通过index确定位置了！！！
                        values[index] = value
                        resolvedCount++
                        if(resolvedCount == promises.length)
                            resolve(values)
                    },
                    reason => {reject(reason)} // 只要有一个失败了 return的这个promise就直接失败了
                )
            })
        })
    }
    /*
    Promise函数对象的race()方法
    返回一个promise对象，其结果由第一个完成的promise决定
    */
    Promise.race = function (promises){
        // 返回一个promise
        return new Promise((resolve, reject)=>{
            promises.forEach((p, index)=>{
                // forEach并不能输出先完成的异步操作，控制输出顺序的是.then
                // 假设初始情况都处于pending，这是就等哪个promise先确定状态，然后执行callback数组中的回调
                // 函数，也就是执行下面的语句！因此决定先后顺序的还是.then

                //p也有可能不是promise,因此用Promise.resolve包装，若是数值则返回成功promise，若是promise则状态传递
                Promise.resolve(p).then(
                    value => {resolve(value)}, // 一旦有成功的，将return变为成功
                    reason => {reject(reason)}
                )
            })
        })
    }
    // 向外暴露Promise函数
    window.Promise = Promise
})(window)
// const p = new Promise((resolve, reject)=>{
//     try{
//         setTimeout(()=>{
//             // !!!注意此处调用resolved的是windows对象，而不是通过promise调用的
//             // setTimeout里抛出的异常没法直接捕获
//             resolve(11)
//         }, 1000)
//     } catch(error){
//         throw error
//     }
//
// }).then(
//     value => {
//         console.log('onResolved1()', value)
//         throw 444
//     },
//     reason => {
//         console.log('onRejected1()', reason)
//
//     }
// ).then(
//     value => {
//         console.log('onResolved2()', value)
//     },
//     reason => {
//         console.log('onRejected2()', reason)
//
//     }
// )
