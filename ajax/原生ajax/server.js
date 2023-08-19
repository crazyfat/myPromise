// import
const express = require('express')
const {response} = require("express");

//2创建应用对象
const app = express()

//3 创建路由规则
// request是对请求报文的封装，response是对响应报文的封装
app.get('/server', (request, response)=>{

    // 打印请求信息
    console.log(request)
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置相应
    response.send('hello world')
})
app.post('/server', (request, response)=>{
    console.log(request.query)
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置相应
    response.send('hello world post')
})
// 掩延时响应
app.get('/delay', (request, response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*')
    setTimeout(()=>{
        response.send('delay response')

    }, 2000)
})
// axios
app.all('/axios-server', (request, response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send('hello axios')
})
app.all('/data', (request, response)=>{
    // response.setHeader('Access-Control-Allow-Origin', '*')
    response.send('user data')
})
// cors
app.all('/cors-server', (request, response)=>{
    response.send('user data')
})
app.all('/json-server', (request, response)=>{
    // console.log(request.query)
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置相应的对象
    const data = {
        name:'wuyi',
        type:'cat',
        age:'1',
        description:{
            color:'yellow',
            size:18,
            sex:1
        }
    }
    // 对data对象进行转换
    let str = JSON.stringify(data)
    // send（）只能接收字符串和buffer
    response.send(str)
})

//4 监听端口
app.listen(8000, ()=>{
    console.log('服务已经启动， 8000端口')
})