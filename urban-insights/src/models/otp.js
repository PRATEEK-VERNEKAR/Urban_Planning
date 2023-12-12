import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required']
    },
    otp:{
        type:String
    }
});

const Otp = mongoose.models.otp || mongoose.model('otp', authSchema);

export default Otp;
