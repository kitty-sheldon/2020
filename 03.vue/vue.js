// new MVVM({el,data,methods})
class VUE {
    constructor(options){
        this.$data = options.data;
        this.$methods = options.methods;
        this.observe(this.$data);
        new Compile(options.el, this)
        if(options.created){
            options.created.call(this);
        }
    }
    observe(value){
        if(!value || typeof value !== 'object'){
            return
        }
        Object.keys(value).forEach(key=>{
            this.defineReactive(value, key, value[key]);
            this.proxyData(key);
        })
    }
    //拦截data上的数据，实现响应式
    defineReactive(obj, key, val){
        this.observe(val);
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            get(){
                //对使用到的数据添加依赖 Dep.target为编译模板时设置
                Dep.target && dep.add(Dep.target)
                return val
            },
            set(newVal){
                if(newVal === val){
                    return
                }
                val = newVal;
                //数据变化通知模板
                dep.notify();
            }
        })
    }
    //将data上的数据代理到this上
    proxyData(key){
        Object.defineProperty(this, key, {
            get(){
                return this.$data[key];
            },
            set(newVal){
                this.$data[key] = newVal;
            }
        })
    }
}
//依赖收集器
class Dep{
    constructor(){
        this.deps = [];
    }
    notify(){
        //通知所有跟当前数据有关的模板更新
        this.deps.forEach(d=>d.update())
    }
    add(dep){
        this.deps.push(dep)
    }
}
//compile和observe的桥梁
class Watcher{
    constructor(vm, key, cb){
        this.vm = vm;
        this.key = key;
        this.cb = cb
        Dep.target = this;
        //触发对应getter，添加依赖
        this.vm[this.key];  
        Dep.target = null;
    }
    update(){
        //调用编译模板时设置的回调函数，更新模板
        this.cb.call(this.vm, this.vm[this.key])
    }
}