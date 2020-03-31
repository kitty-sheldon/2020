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
    const num = Number(localStorage.getItem('xx_broad')) || 1
    const titleDom = document.getElementById('title').innerText = `Tab${isRefresh ? num : num+1}` 
    //刷新
    if(isRefresh){
        return
    }
    localStorage.setItem('xx_broad', num+1)
}