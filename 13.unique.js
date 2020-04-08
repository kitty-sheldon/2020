const list = [1, 2, 1, '1', '1', '2', 2, 3]

function unique1(arr) {
  let res = []
  let i = 0
  let len = arr.length
  while (i < len) {
    const cur = arr[i]
    if (res.indexOf(cur) === -1) {
      res.push(cur)
    }
    i++
  }
  return res
}

//排序，前后值不同
function unique2(arr) {
  return arr.sort((a,b)=>{

  }).reduce((acc, cur)=>{
    const len = acc.length
    if(len === 0 || acc[len - 1] !== cur){
      acc.push(cur)
    }
    return acc
  }, [])
}

//set
const unique3 = (arr = []) => [...new Set(arr)]

console.log(unique1(list))
console.log(unique2(list))