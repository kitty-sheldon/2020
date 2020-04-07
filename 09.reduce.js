Array.prototype.myReduce = function () {
  const arr = this;
  const {
    length
  } = arr;
  const cb = arguments[0];
  const argsLen = arguments.length;
  const hasInitial = argsLen >= 2;
  let val = hasInitial ? arguments[1] : arr[0];
  let index = hasInitial ? 0 : 1;
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }
  if (length === 0 && argsLen <= 1) {
    throw new TypeError('Reduce of empty array with no initial value')
  }
  while (index < length) {
    val = cb(val, arr[index], index, arr)
    index++
  }
  return val
}

const a = [1, 2, 3, 4].myReduce((acc, cur) => acc * cur, 10)
console.log(a)