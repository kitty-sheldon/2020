(function broad(){
    const bc = new BroadcastChannel('Xiao')
    
    document.getElementById('broadcast').onclick = (e)=>{
        const value = getValue(e)
        bc.postMessage({
            value
        })
        
    }
    bc.onmessage = (res)=>{
        document.getElementById('bc-message').innerText = `[message]: ${res.data.value}`
        console.log(res)
    }
})()


window.onload = ()=>{
    const {type} = performance.navigation
    const isRefresh = type === 1
    let num = Number(localStorage.getItem('xx_broad')) || 0
    if((num && !isRefresh) || !num){
        num++
        localStorage.setItem('xx_broad', num)
    }
    document.getElementById('title').innerText = `Tab${num}` 
}