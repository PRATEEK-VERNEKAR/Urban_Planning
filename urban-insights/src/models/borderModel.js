import mongoose, { Schema } from 'mongoose'

const borderSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    states:[
        {
            type:String
        }
    ],
    neighborCountry:[
        {
            type:String
        }
    ],
    area:{
        type:Schema.Types.Decimal128,
        required:[true,'Area (sq. km) is required']
    },
    borderLength:{
        type:Schema.Types.Decimal128,
        required:[true,'Border Lenght is required']
    },

})

const Border=mongoose.models.borders || mongoose.model('borders',borderSchema);

export default Border;