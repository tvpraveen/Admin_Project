const express = require('express');
const env = require('dotenv');
const { default: mongoose } = require('mongoose');
const tokenVerify = require('./jwt_Verification')
// require('dotenv').config()
const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/adminProject")

app.use('/api', tokenVerify.jwtVerification,require('./routes'))
// app.get('/api',(req,res)=>{
//     res.status(200).end('server started')
// })

app.listen(5050,()=>{
    console.log("server running on port");
})

