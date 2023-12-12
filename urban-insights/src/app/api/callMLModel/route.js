import Border from "../../../models/borderModel";
import MonitorModel from "../../../models/moniteringModel";
import {connect} from "../../../dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import axios from 'axios';

export async function GET(req,res){
    try{

        connect();
        const allMonitorRegions=await MonitorModel.find({});
        

        allMonitorRegions.forEach((singleRegion)=>{
            const imageData=singleRegion['imageData'];
            imageData.forEach(async (singleImageData)=>{
                // const modelPrediction = await fetch("http://localhost:8080/predict",{
                //     method:"POST",
                //     header:{"Content-Type":'application/json'}
                //     body:JSON.stringify({image:singleImageData.image.data})
                // })

                const modelPrediction = await axios.post('http://localhost:8080/predict', {
                    image: singleImageData.image.data
                });

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