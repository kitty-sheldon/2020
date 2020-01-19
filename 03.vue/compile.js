class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;
        if (this.$el) {
            this.$fragment = this.nodeToFragment(this.$el);
            this.compile(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }
    //dom变为片段，减少dom操作
    nodeToFragment(el) {
        let frag = document.createDocumentFragment();
        let child;
        while ((child = el.firstChild)) {
            //dom节点移动至片段中，会改变this.$el
            frag.appendChild(child)
        }
        return frag;
    }
    //将片段进行编译，分别处理元素和插值文本
    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                this.compileElement(node)
            }else if (this.isInterpolation(node)) {
                this.compileText(node)
            }
            //如果有子元素，递归编译
            if(node.childNodes && node.childNodes.length > 0){
                this.compile(node)
            }
        })
    }
    isElement(el) {
        return el.nodeType === 1;
    }
    isInterpolation(el) {
        return el.nodeType === 3 && /\{\{(.*)\}\}/.test(el.textContent);
    }
    isDirective(exp) {
        return exp.indexOf('v-') === 0;
    }
    isEvent(exp) {
        return exp.indexOf('@') === 0;
    }
    compileElement(node) {
        const attributes = node.attributes;
        Array.from(attributes).forEach(attr => {
            const {
                name,
                value
            } = attr;
            if (this.isDirective(name)) {
                //v-text v-model v-html
                const direct = name.substring(2);
                this[direct] && this[direct](node, value)
            }
            if (this.isEvent(name)) {
                //@click
                const eventName = name.substring(1);
                this.eventHandler(node, eventName, value);
            }
        })
    }
    text(node, exp) {
        this.update(node, exp, 'text');
    }
    model(node, exp) {
        this.update(node, exp, 'model');
    }
    html(node, exp) {
        this.update(node, exp, 'html');
    }
    textUpdater(node, value) {
        node.textContent = value;
    }
    modelUpdater(node, value) {
        node.value = value;
    }
    htmlUpdater(node, value) {
        node.innerHTML = value;
    }
    update(node, exp, name) {
        const vm = this.$vm;
        const method = `${name}Updater`;
        //初始化渲染
        method && this[method](node, this.$vm[exp]);
        //依赖收集
        new Watcher(vm, exp, value=>{
            method && this[method](node, value);
        })
    }
    compileText(node) {
        this.text(node, RegExp.$1);
    }
    eventHandler(node, name, fnName){
        const vm = this.$vm;
        const {$methods} = vm;
        const fn = $methods && $methods[fnName];
        if(fn){
            node.addEventListener(name, fn.bind(vm))
        }
    }
}