const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController')

router.post('/client', (req,res)=>{
    clientController.createClient(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send({
        message: err.message
    }))
})

router.get('/getAllClients', (req,res)=>{
    clientController.getAllClients(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err=> {
            res.status(500).send({
                message: err.message
        })
    })
})

router.get('/getClientsAdmin', (req,res)=>{
    clientController.getClientsCreatedByAdmin(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
})

router.get('/getClients/:id', (req,res)=>{
    clientController.getClientById(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
})


router.get('/getClientsWithAdminData', (req,res)=>{
    clientController.getClientsWithAdminData(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err=> {
            res.status(500).send({
                message: err.message
        })
    })
})



module.exports = router