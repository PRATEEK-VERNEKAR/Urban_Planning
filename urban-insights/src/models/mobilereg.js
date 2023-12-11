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

const mobilereg = mongoose.models.mobile || mongoose.model('mobile',mobileSchema);
export default mobilereg;
