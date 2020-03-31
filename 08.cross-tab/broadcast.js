import {getValue} from './util'
const bc = new BroadcastChannel('Xiao')
const postMessage = (e)=>{
    const value = getValue(e)
    bc.postMessage({
        value
    })
}
export default {
    postMessage
}