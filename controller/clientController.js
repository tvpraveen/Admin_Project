const clientModel = require('../model/clientModel');
const { ObjectId } = require('mongoose').Types
const createClient = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { firstName, lastName, email, password, createdBy } = req.body
            const clientDetails = await clientModel.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                createdBy: createdBy
            })
            console.log(clientDetails);
            resolve({
                message: "successfully created client",
                clientDetails
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const getAllClients = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getallclients = await clientModel.find();
            console.log(getallclients);
            resolve({
                message: "successfully got clients",
                getallclients
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const getClientsCreatedByAdmin = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getclients = await clientModel.find({
                createdBy: new ObjectId(req.body.adminId)
            });
            resolve({
                message: "successfully got clients",
                getclients
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const getClientById = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getclient = await clientModel.findById({
                _id: new ObjectId(req.params.id)
            }).catch(e => reject({ message: e.message }));
            resolve({
                message: "successfully got client",
                getclient: getclient
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const getClientsWithAdminData = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getclientswithadmindata = await clientModel.aggregate([{
                $lookup: {
                    from: 'users',
                    let: {
                        id: '$createdBy'
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ['$$id', '$_id']
                            }
                        }
                    }],
                    as:'adminDetails'
                }
            }])
            console.log(getclientswithadmindata);
            resolve({
                getclientswithadmindata
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}



module.exports = {
    createClient, getAllClients, getClientsCreatedByAdmin, getClientById,
    getClientsWithAdminData
}

