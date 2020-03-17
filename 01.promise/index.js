class Promise{
    constructor(exector){
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value =>{
            this.state = 'fulfilled'
            this.value = value
            this.onFulfilledCallbacks.forEach(fn=>fn())
        }

        const reject = reason =>{
            this.state = 'rejected'
            this.reason = reason
            this.onRejectedCallbacks.forEach(fn=>fn())
        }

        try {
            exector(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

        const promise2 = new Promise((resolve, reject)=>{
            const asyncFulfilled = ()=>{
                setTimeout(()=>{
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            const asyncRejected = ()=>{
                setTimeout(()=>{
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            switch(this.state){
                case 'pending':
                    this.onFulfilledCallbacks.push(asyncFulfilled)
                    this.onRejectedCallbacks.push(asyncRejected)
                    break
                case 'fulfilled':
                    asyncFulfilled()
                    break
                case 'rejected':
                    asyncRejected()
                    break
            }
        })
        return promise2
    }
    catch(fn){
        this.then(null, fn)
    }
}

Promise.resolve = value =>{
    return new Promise(resolve=>resolve(value))
}

Promise.reject = error =>{
    return new Promise((resolve,reject)=>reject(error))
}

Promise.race = promises =>{
    if(!Array.isArray(promises)){
        return new TypeError('Promise.race arguments must be array')
    }
    return new Promise((resolve, reject)=>{
        let length = promises.length
        for(let i = 0; i < length; i++){
            promises[i].then(resolve, reject)
        }
    })
}

Promise.all = promises => {
    if(!Array.isArray(promises)){
        return new TypeError('Promise.all arguments must be array')
    }
    return new Promise((resolve, reject)=>{
        let length = promises.length
        let result = []
        let num = 0
        for(let i = 0; i < length; i++){
            promises[i].then(data=>{
                num++
                result[i] = data
                if(num === length) resolve(result)
            }, reject)
        }
    })
}

function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x){
        return reject(new TypeError('循环引用'))
    }
    if(x != null && (typeof x === 'object' || typeof x === 'function')){
        let called = false
        try {
            const {then} = x
            if(typeof then === 'function'){
                then.call(x, y=>{
                    if(called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, error=>{
                    if(called) return
                    called = true
                    reject(error)
                })
            }else{
                resolve(x)
            }
        } catch (error) {
            if(called) return
            called = true
            reject(error)
        }
    }else{
        resolve(x)
    }
}



// promises-aplus-tests 测试代码
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
module.exports = Promise;

  