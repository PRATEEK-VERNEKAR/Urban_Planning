import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    deptusername: {
        type: String,
        required: [true, 'dept username is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    deptpassword: {
        type: String,
        required: [true, 'dept password is required']
    },
    assignedRegionID:[String],
    isAdmin:{
        type:Boolean,
        default:false
    },
    

});

const Authentication = mongoose.models.auth || mongoose.model('auth', authSchema);

export default Authentication;