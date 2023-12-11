import mongoose,{Schema} from "mongoose";

const mobileSchema = new mongoose.Schema({
    username:{
        type:String,
        requried:[true]
    },
    phoneno:{
        type:String,
        required:[true]
    }
});

const Mobilereg = mongoose.models.mobile || mongoose.model('mobile',mobileSchema);
export default Mobilereg;
