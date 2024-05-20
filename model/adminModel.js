const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const superAdmin_Shema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "please enter the valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        default:''
    },
    role: {
        type: String
    }

})

superAdmin_Shema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12); //12 is cost parameter or salt 
    next();
})

superAdmin_Shema.methods.comparePasswordInDb = async function(psw,pswDb){
        return await bcrypt.compare(psw,pswDb)
}

const superAdminModel =mongoose.model('user', superAdmin_Shema);

module.exports = superAdminModel

