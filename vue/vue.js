//new Vue({data...})
class Vue{
    constructor(options){
        this.options = options;
        this.$data = options.data;
        this.observe(this.$data);
        new Compile(options.el, this)
        if (options.created) {
            options.created.call(this);
        }
    }
    observe(value){
        if(value && typeof value !== 'object'){
            return
        }

        Object.keys(value).forEach(key=>{
            this.defineReactive(value,key,value[key]);
            this.proxyData(key);  //代理data中的属性到vue实例上
        })

    }
    //数据响应
    defineReactive(obj, key, val){
        this.observe(val)   //递归解决数据嵌套
        const dep = new Dep();
        //数据劫持
        Object.defineProperty(obj, key, {
            get(){
                Dep.target &&  dep.addDep(Dep.target)
                return val
            },
            set(newVal){
                if(newVal === val){
                    return
                }
                val = newVal;
                dep.notify()
                console.log(`${key}属性更新了，newvalue is ${val}`)
            }
        })  
    }

    proxyData(key){
        Object.defineProperty(this, key, {
            get(){
                return this.$data[key]   //代理，this[key] 访问的即this.$data[key]
            },
            set(newVal){
                this.$data[key] = newVal;
            }
        })
    }
}
//依赖收集的目的，收集保存与数据相关的部分，在需要更新的时候通知这些部分。做法：遍历模板，用正则匹配
//Dep(订阅者)  管理Watcher 发布订阅模式
class Dep{
    constructor(){
        //收集watcher
        this.deps = []

    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify(){
        this.deps.forEach(dep=>dep.update())
    }

}


//Watcher 实现update方法，调用更新
class Watcher{
    constructor(vm, key, cb){
        Object.assign(this,{
            vm, 
            key,
            cb
        })
        //将watcher实例指定到静态属性target
        Dep.target = this;
        this.vm[this.key]   //触发getter添加依赖
        Dep.target = null;
    }
    update(){
        this.cb.call(this.vm, this.vm[this.key])
        console.log('属性更新了')
    }
}