import broadcast from './broadcast'
document.getElementById('broadcast').onclick = (e)=>{
    broadcast.postMessage(e)
}