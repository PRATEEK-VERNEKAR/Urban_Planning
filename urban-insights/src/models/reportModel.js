import mongoose from "mongoose";

const reportSchema=new mongoose.Schema({
    city:{
        type:String,
        required:[true,"City Required"],
    },
    state:{
        type:String,
        required:[true,"State Required"],
    },
    waters:{
        type:String,
    },
    buildings:{
        type:String,
    },
    roads:{
        type:String,
    },
    previousImage:{
        data:Buffer,
        contentType:String
    },
    currentImage:{
        data:Buffer,
        contentType:String
    }
})


const Report = mongoose.models.reports || mongoose.model('reports',reportSchema);

export default Report;