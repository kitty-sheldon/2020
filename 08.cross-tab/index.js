(function broad(){
    const bc = new BroadcastChannel('Xiao')
    
    document.getElementById('broadcast').onclick = (e)=>{
        const value = getValue(e)
        const tab = getTab()
        bc.postMessage({
            value,
            tab
        })
        
    }
    bc.onmessage = (res)=>{
        const {value, tab} = res.data;
        document.getElementById('bc-message').innerText = `[message]: get ${value} from ${tab}`
    }
})()


window.onload = ()=>{
    const {type} = performance.navigation
    const isRefresh = type === 1
    let num = /new/.test(location.search) ? Number(localStorage.getItem('xx_broad')) : 1
    
    //刷新不更改数字
    if((num && !isRefresh) || !num ){
        num++
    }
    localStorage.setItem('xx_broad', num)
    document.getElementById('title').innerText = `Tab${num}` 
}
function onpenNewTab(){
    window.open(`${location.href}?new=1`)
}