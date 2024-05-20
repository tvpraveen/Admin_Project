const superAdminModel = require('../model/adminModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const signup = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {firstName,lastName,email,role,password} = req.body;
            const { id } = req.authBody;
            const userDetails = await superAdminModel.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                createdBy:id,
                role: role
            })
            console.log(userDetails);
            resolve({
                message: "successfully created",
                userDetails
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}


const login = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sAdminEmail = req.body.email;
            const sAdminPassword = req.body.password;
            if (!sAdminEmail || !sAdminPassword) {
                console.log("please enter email and password");
                reject({
                    message: "please enter email and password"
                })
            }
            const superAdmin = await superAdminModel.findOne({ email: sAdminEmail }).select("+password");

            if (!superAdmin || !(await superAdmin.comparePasswordInDb(sAdminPassword, superAdmin.password))) {
                console.log("incorrect email or password");
                reject({
                    message: "incorrect email or password"
                })
            }

            const token = jwt.sign({ id: superAdmin._id }, process.env.AUTH_KEY)

            resolve({
                message: "successfull",
                token
            })
        }
        catch (err) {
            message: err.message
        }
    })
}


module.exports = {
    signup, login
}