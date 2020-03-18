function jsonp({
    url,
    params={},
    callbackName = 'callback'
}) {
    return new Promise((resolve,reject) => {
        if(typeof url !== 'string'){
            reject(new Error('url must be string'))
        }
        let script = document.createElement('script')
        let arr = [`callback=${callbackName}`]
        Object.keys(params).forEach(key => {
            arr.unshift(`${key}=${params[key]}`)
        })
        script.src = `${url}?${arr.join(&)}`
        document.appendChild(script)
        window[callbackName] = function (res) {
            resolve(res)
            document.body.removeChild(script)
        }
    })
}