const express = require('express')
const app = express()
app.get('/home', (requset, response)=>{
    response.sendFile(__dirname+'/index.html')
})

app.all('/data', (request, response)=> {
    // response.setHeader('Access-Control-Allow-Origin', '*')
    response.send('user data')
})
app.listen(9000, ()=>{
    console.log('server has start')
})