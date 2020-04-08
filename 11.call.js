Function.prototype.myCall = function(contxt){
  contxt = contxt || window
  contxt.fn = this
  const args = [...arguments].slice(1)
  const result = contxt.fn(...args)
  delete contxt.fn
  return result
}

Function.prototype.myApply = function(contxt){
  contxt = contxt || window
  contxt.fn = this
  const args = arguments[1]
  const result = args ? contxt.fn(...args) : contxt.fn()
  delete contxt.fn
  return result
}

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.myCall(this, name, price);
  this.category = 'food';
}

function Dinner(name, price) {
  Product.myApply(this, [name, price]);
  this.category = 'dinner';
}

console.log(new Food('cheese', 5).name);
console.log(new Dinner('beef', 20).name);
// expected output: "cheese"
