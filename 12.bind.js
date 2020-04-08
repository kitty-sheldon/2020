Function.prototype.myBind = function(){
  const slice = Array.prototype.slice;
  const fn = this;
  const contxt = arguments[0];
  const innerArgs = slice.call(arguments, 1);
  if(typeof fn !== 'function'){
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }
  return function(){
    const outerArgs = slice.call(arguments);  //Array.from(arguments)   [...arguments] also work
    const args = innerArgs.concat(outerArgs)
    return fn.apply(contxt, args)
  }
}

const m = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

const unboundGetX = m.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(m);
console.log(boundGetX());