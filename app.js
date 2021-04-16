const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
// const cors = require('cors')
const mongoose  = require('mongoose')
const {MONGOURI} = require('../server/keys')

// app.use(cors());

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})

mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo DB")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./route/auth'))
app.use(require('./route/post'))
app.use(require('./route/user'))



app.get('/',(req,res)=>{
    res.send('hello')
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})