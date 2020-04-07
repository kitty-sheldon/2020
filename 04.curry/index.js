//实现sum(1)(2)(3)...(n)

//缺点，无法执行不是3个参数的，n个要写n次嵌套
function add1(a){
    let sum = 0;
    sum += a;
    return function(b){
        sum+=b;
        return function(c){
            sum+=c;
            return sum
        }
    }
}

//add2(1)(2)(3)() 调用
function add2(a){
    let sum = 0;
    sum +=a;
    return function temp(b){
        if(arguments.length === 0){ //递归出口
            return sum
        }
        sum+=b
        return temp
    }
}

//调用同add2， 优点：支持传入多参数
function add3(){
    let arg = [].concat(Array.from(arguments));
    return function temp(){
        if(arguments.length === 0){
            return arg.reduce((a,b)=>a+b)
        }
        arg = arg.concat(Array.from(arguments))
        return temp
    }
} 

//add(1)(2)(3) 调用
function add4(a){
    let sum = 0;
    sum +=a;
    const temp=(b)=>{
        if(arguments.length === 0){ //递归出口
            return sum
        }
        sum+=b
        return temp
    }

    temp.toString = temp.valueOf = function(){
        return sum
    }
    return temp
}

//改造，提取通用柯里化函数
function curry(fn){
    let arr = Array.prototype.slice.call(arguments, 1)
    return function temp(){
        if(arguments.length === 0){
            return fn.apply(null, arr)          
        }
        arr = arr.concat(Array.from(arguments))
        return temp
    }
}

function sum(a,b){
    return Array.from(arguments).reduce((a,b)=>a+b)
}

function multi(){
    return Array.from(arguments).reduce((a,b)=>a*b)
}

function test(){
    const add5 = curry(sum)
    const multi1 = curry(multi)
    console.log('add1',add1(1)(2)(3))
    console.log('add2',add2(1)(2)(3)())
    console.log('add3',add3(1)(2)(3)())
    console.log('add4',add4(1)(2)(3))
    console.log('add5',add5(1)(2,3)())
    console.log('multi1',multi1(1)(2,3)(4)())
}

test()