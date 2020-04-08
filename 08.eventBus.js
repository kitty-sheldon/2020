class EventBus {
    constructor() {
        this.caches = {}
    }
    on(name, fn) {
        if (this.caches[name]) {
            this.caches[name].push(fn)
        } else {
            this.caches[name] = [fn]
        }
        return this
    }
    emit(name, ...rest) {
        const fns = this.caches[name]
        if (Array.isArray(fns)) {
            fns.forEach(fn => fn(...rest))
        }
        return this
    }
    off(name, fn) {
        if (!fn) {
            delete this.caches[name]
        } else {
            let fns = this.caches[name]
            if (Array.isArray(fns)) {
                const index = fns.indexOf(fn)
                index !== -1 && fns.splice(index, 1)
            }
        }
        return this
    }
}

const bus = new EventBus()
bus.on('message', (...msg) => {
    console.log(msg)
})
bus.emit('message', {
    a: 1,
    b: 2
}, [2222])

