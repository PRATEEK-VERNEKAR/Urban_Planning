import mongoose, {Schema} from "mongoose";
const authSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'email is required']

    },
    username:{
        type:String,
        required:[true,'username is required']
    },
    deptusername:{
        type:String,
        required:[true,'dept username is required']

    },
    password:{
        type:String,
        requried:[true,'password is required']
    },
    deptpassword:{
        type:String,
        requried:[true,'otp is required']
    }
})

const Authentication = mongoose.models.auth || mongoose.model('auth',authSchema);
export default Authentication;
