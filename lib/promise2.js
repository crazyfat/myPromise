const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function MyPromise(executor){
    const self = this;
    this.state = PENDING;
    this.value = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    function resolve(value){
        if(value instanceof MyPromise){
            return value.then(resolve, reject);
        }else{
            setTimeout(()=>{
                if(self.state === PENDING){
                    self.state = RESOLVED;
                    self.value = value;
                    self.resolvedCallbacks.forEach(cb=>{
                        cb(value)
                    })
                }
            })
        }
    }
    function reject(reason){
        setTimeout(()=>{
            if(self.state === PENDING){
                self.state = RESOLVED;
                self.value = reason;
                self.rejectedCallbacks.forEach(cb=>{
                    cb(reason);
                })
            }
        })
    }
    try{
        executor(resolve, reject);
    }catch (e){
        reject(e)
    }
}
MyPromise.prototype.then = function(onFulfilled, onRejected){
    const self = this;
    return new MyPromise((resolve, reject)=>{
        let fulfilled = ()=>{
            try{
                const res = onFulfilled(self.value);
                return res instanceof MyPromise? res.then(resolve, reject):resolve(res);
            }catch (e){
                reject(e);
            }
        }
        let rejected = ()=>{
            try{
                const res = onRejected(self.value);
                return res instanceof MyPromise? res.then(resolve, reject):reject(res);
            }catch (e){
                reject(e);
            }
        }
        switch (self.state){
            case PENDING:
                self.resolvedCallbacks.push(fulfilled);
                self.rejectedCallbacks.push(rejected);
                break;
            case RESOLVED:
                fulfilled()
                break;
            case REJECTED:
                rejected()
                break;
        }
    })
}
MyPromise.prototype.all = function(promises){
    return new MyPromise((resolve, reject)=>{
        let cnt = 0, len = promises.length, res = new Array(len);
        for(let i = 0; i<len; i++){
            let p = Promise.resolve(promises[i]);
            p.then(
                value => {
                  res[i] = value;
                  cnt++;
                  if(cnt === len) return resolve(res);
                },
                reason => reject(reason)
            )
        }
    })
}
MyPromise.prototype.race = function(promises){
    return new MyPromise((resolve, reject)=>{
        promises.forEach(p=>{
            Promise.resolve(p).then(resolve, reject)
        })
    })
}
















