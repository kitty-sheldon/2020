//生成一个数组，长度为5，里面的每一项为2-32之间一个不重复的随机数
/*
1、是否为整数
2、是否包含2
3、是否包含32
*/
let arr = new Array(5);
/*生成随机数，左闭右开 [2, 32）*/
const getRandomValue = (min, max) => {
    return Math.random() * (max - min) + min;
}

/*生成随机整数，左闭右开*/
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/*生成随机整数，左闭右闭*/
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*判读生成数组长度是否超过限制，左右都包含的情况，其他情况可按需拓展*/
const isExceedLength = (length, min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return length > max - min + 1
}

function getRandomArray(params = {}) {
    let {
        arr = [], length = 5, min = 2, max = 32
    } = params;
    const exceed = isExceedLength(length, min, max)
    if (exceed) {
        console.log('长度超限制')
        return
    }
    const value = getRandomIntInclusive(2, 32);
    if (!arr.includes(value)) {
        arr.push(value)
    }
    return arr.length === length ? arr : getRandomArray({
        ...params,
        arr
    })
}
const result = getRandomArray()
console.log(result, 'result')