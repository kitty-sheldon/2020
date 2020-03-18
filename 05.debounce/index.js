function debounce(fun, time){
    let timer = null;
    return (event)=>{
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fun(event)
        }, time)
    }
}

function debounceImmediate(fun, time, immediate){
    if(immediate){
        fun()
    }
    let timer = null;
    return function(event){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fun(event)
        }, time)
    }
}