// import
const express = require('express')
const {response} = require("express");

//2创建应用对象
const app = express()

//3 创建路由规则
// request是对请求报文的封装，response是对响应报文的封装
app.get('/', (request, response)=>{
    // 设置相应
    response.send('hello world')
})

//4 监听端口
app.listen(8000, ()=>{
    console.log('服务已经启动， 8000端口')
})