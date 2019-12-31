## 手写promise

# 思路
# 整体
1. 通过new实例化promise， promise是一个构造函数
2. promise接收一个函数作为参数，该函数又包含成功resolve和失败reject的两个方法
3. 在promise 实例上调用then方法，promise原型上有一个then方法
4. 通过then方法可以链式调用，则then方法返回一个promise实例
5. 支持异步，使用发布订阅模式，先将成功和失败的回调存储起来（订阅），在确定状态改变时执行存储的回调（发布）
6. 状态一旦改变不可以再变

# promise构造函数
1. 初始化状态、成功数据、失败数据、成功回调存放数组、失败回调存放数组
2. 执行传入的函数executor，executor包含成功resolve和失败reject的两个回调
3. 声明resolve和reject两个函数，对应传入成功和失败的回调
4. 执行resolve/reject时：状态由pending变为成功fulfilled/失败rejected、赋值成功/失败数据、执行成功/失败回调数组中的方法

# then方法
1. 支持then链式调用，返回promise实例
2. then方法接受两个参数，第一个参数成功的回调onFulfilled，第二个参数失败的回调onRejected
3. promise实例参数传递一个函数，包含resolve和reject两个方法。函数中按状态分别处理，pending状态时，存储onFulfilled和onRejected。
4. onFulfilled和onRejected有点绕。。。 以onFulfilled为例，执行onFulfilled，并将结果resolve出去作为下一个then方法的成功回调的参数。
```javascript
//处理普通值
if(this.status === 'fulfilled'){
    try{
      let x = onFulfilled(this.value)
      resolve(x)
    }catch(e){
      reject(e)
    }
}
```
5. 回调函数的返回值有多种情况，普通值，非普通值（promise或异常），所以将处理回调函数的返回值单独抽成一个方法a。普通值，传递到下一个then中成功回调中；promise，递归调用a；异常，传递到下一个then失败的回调中。


# references：

<https://juejin.im/post/5c6ad98e6fb9a049d51a0f5e#heading-5>

<https://juejin.im/post/5b1e9c8e6fb9a01e273119b2>

<https://juejin.im/post/5dc383bdf265da4d2d1f6b23>

<https://www.jianshu.com/p/c633a22f9e8c>



