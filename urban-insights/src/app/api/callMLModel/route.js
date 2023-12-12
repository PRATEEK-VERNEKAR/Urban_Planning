import Border from "../../../models/borderModel";
import MonitorModel from "../../../models/moniteringModel";
import {connect} from "../../../dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import axios from 'axios';
import Authentication from "../../../models/auth";

export async function GET(req,res){
    const {userId} = req.json()
    if(!userId.length){
        return NextResponse.json({"message":"User ID is required"},{status:400})
    }
    try{

        connect();
        const allMonitorRegions=await MonitorModel.find({});
        const user = await Authentication.findById(userId);

        allMonitorRegions.forEach((singleRegion)=>{
            const imageData=singleRegion['imageData'];
            imageData.forEach(async (singleImageData)=>{
               
                const modelPrediction = await axios.post('http://localhost:8080/predict', {
                    image: singleImageData.image.data
                });

                // get the user 


                console.log(typeof(modelPrediction.data));
                console.log(modelPrediction);
            })
        })
        
        return NextResponse.json({"msg":"HI"},{status:200});
    }
    catch(err){
        return NextResponse.json({"message":"Error calling ML Model"},{status:500})
    }
}