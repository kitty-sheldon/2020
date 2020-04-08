function deepClone(target, map= new WeakMap()){
  if(typeof target === 'object'){
    const isCircular = map.get(target)
    if(isCircular){
      return target
    }
    let clonedTarget = Array.isArray(target) ? [] : {}
    map.set(target, clonedTarget)
    for(const key in target){
      clonedTarget[key] = deepClone(target[key], map)
    }
    return clonedTarget
  }
  return target
}

const a = [2,3,4]
const c = {a}
let t = {
  a:1,
  b:2,
  c,
}
t.t = t
let ct = deepClone(t)
console.log(t)
console.log(ct)
t.b = 3
t.c.a[0] = 'hhh'
console.log(t)
console.log(ct)


