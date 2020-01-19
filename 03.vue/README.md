## vue响应式

# 手写vue响应式原理
# 思路
需要做三件事情：
1. 监听数据变化
2. 编译模板
3. 关联模板和数据

# 监听数据变化（observe）
1. 通过Object.defineProperty 对this.data进行拦截，对每一个key进行监听，当value发生变化时，通知使用该key的地方更新
2. 将data中的数据代理到this上， 实现访问this[key],就是访问this.data[key]

# 编译模板(compile)
1. 处理插值文本{{}}
2. 处理元素
    1) 处理指令 v-text v-html v-model 等
    2) 处理事件 @
处理中做的事情：将初始化数据渲染到模板中，订阅监听方法（new Watcher()），当数据变化时更新模板。

# 关联模板和数据
依赖收集（Dep）
1. 当使用到某数据（get）时，生成一个依赖，将依赖存放到依赖收集数组（deps）中
2. 数据发生变化（set）时，发布通知（dep.notify）给对应模板(其实就是调用编译模板时设置的回调函数)
Watcher 作为数据和模板的桥梁，在编译模板时创建watcher 设置发生变化时的回调；在数据发生变化时（被set方法拦截），通知模板更新

# references：
[思路](https://segmentfault.com/a/1190000006599500)  [appendChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)  [createDocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)
# 其他感觉不错的文章：  
[深入理解 Vue 框架基本原理](https://juejin.im/entry/5982e16a6fb9a03c50227ef5)  [看完这篇关于MVVM的文章，面试通过率提升了80%](https://juejin.im/post/5af8eb55f265da0b814ba766)




