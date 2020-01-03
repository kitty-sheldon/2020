//模板浏览器不认识，需要编译成浏览器认识的
//如v- @ : {{}} 
class Compile{
    constructor(el, vm){
        this.$el = document.querySelector(el);  //要遍历的宿主节点
        this.$vm = vm;
        if(this.$el){
            //生成片段
            this.$fragment = this.nodeToFragment(this.$el);   
            //编译 
            this.compile(this.$fragment);
            /**
             * 将编译完的html追加至el中
             * 因nodeToFragment中将this.$el移空了，所以append不会有重复
             */
            this.$el.appendChild(this.$fragment);                 
        }
    }

    //将dom变为片段，操作片段，避免直接操作dom
    nodeToFragment(el){
        const fragement = document.createDocumentFragment();
        //将el中子元素移动至fragment中,直到el为空
        let child;
        //firstChild有值会一直执行，直至el中没有元素
        while(child=el.firstChild){
            fragement.appendChild(child)  //appendChild如果被插入的节点已经存在于当前文档的文档树中,则那个节点会首先从原先的位置移除,然后再插入到新的位置.
        }
        return fragement
    }

    compile(el){
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node=>{
            //类型判断,区分元素和文本
            if(this.isElement(node)){
                console.log('元素')
            }else if(this.isInterpolation(node)){
                console.log('插值文本')
                this.compileText(node)
            }
            //递归子节点
            if(node.childNodes && node.childNodes.length > 0){
                this.compile(node)
            }
        })
    }
    
    //判断元素
    isElement(node){
        return node.nodeType === 1;
    }

    //判断插入文本，非普通文本，普通文本无需监听
    isInterpolation(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    //编译文本
    compileText(node){
        //node.textContent = this.$vm.$data[RegExp.$1]
        this.update(node, this.$vm, RegExp.$1, 'text')
    }

    //更新函数
    update(node, vm, exp, type){
        const updateFn = this[`${type}Updater`]
        updateFn && updateFn(node, vm.$data[exp])
        //依赖收集
        new Watcher(vm, exp, (value)=>{
            updateFn && updateFn(node, value)
        })
    }

    textUpdater(node, value) {
        node.textContent = value;
    }
}
