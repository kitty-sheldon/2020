function throttle(fn, time){
  let canRun = true; 
  return (args)=>{
    if(!canRun) return
    canRun = false
    setTimeout(() => {
      fn(args)
    }, time);
  }
}