const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();
const userRoles = require('../utils/userRoles');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email address'],
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'Password must be at least 6 characters'],
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN , userRoles.USER , userRoles.GUEST],
        default:userRoles.USER,
        
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    token:{
        type:String,
        default:String
    },
    avatar:{
        type:String,
        default:'uploads/profile.png'
    }
});
module.exports = mongoose.model('User',userSchema);