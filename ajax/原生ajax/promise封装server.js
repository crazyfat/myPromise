function queryData(url){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4 && xhr.status>=200 && xhr.status<300){
                console.log(xhr.getAllResponseHeaders()) // 所有响应头
                console.log(xhr.response)// 响应体
                console.log(xhr.responseXML)
                resolve(xhr.responseText)
            }else{
                reject('服务器问题：'+xhr.statusText)
            }
        }
        xhr.send()
    })
}

const p = queryData('http://127.0.0.1:8000/server')
p.then(
    value => {
        console.log(value)
        return queryData('http://127.0.0.1')
    },
    reason => {
        console.log('第一轮请求服务器故障：'+reason+' 终止进程')
    }
).then(
    value => {},
    reason => {
        console.log('第二轮请求服务器故障：'+reason+' 终止进程')
    }
)