const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail]
    },
    password: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        default: ""
    }
})

clientSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12);
    next();
})



const clientModel = mongoose.model('client', clientSchema)

module.exports = clientModel