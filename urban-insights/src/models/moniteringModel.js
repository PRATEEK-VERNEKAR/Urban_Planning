import mongoose from "mongoose";

const moniteringModelSchema=mongoose.Schema({
    "regionID":{
        type:String,
        required:[true,"region id is required"]
    },
    "startDateTime":{
        type:Date
    },
    "imageData":[
        {
            "dateTime":{
                type:Date
            },
            "image":{
                data:Buffer,
                contentType:String
            },
            "classes":[Number],
            "predicted":Boolean
        }
    ]
})

const MonitorModel=mongoose.models.monitormodels || mongoose.model('monitormodels',moniteringModelSchema);

export default MonitorModel;