const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')


router.post('/superAdmin', (req,res)=>{
   adminController.signup(req).then((data)=>{
    res.status(200).send(data)
   }).catch(err=> res.status(500).send({
    message: err.message
   }))
})

router.post('/login', (req,res)=>{
    adminController.login(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err=> res.status(500).send({
        message: err.message
    }))
})


module.exports = router