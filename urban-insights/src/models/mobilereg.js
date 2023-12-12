import mongoose,{Schema} from "mongoose";

const mobileSchema = new mongoose.Schema({
    username:{
        type:String,
        requried:[true]
    },
    email:{
        type:String,
        required:[true]
    }
});

const Mobilereg = mongoose.models.mobile || mongoose.model('mobile',mobileSchema);
export default Mobilereg;
