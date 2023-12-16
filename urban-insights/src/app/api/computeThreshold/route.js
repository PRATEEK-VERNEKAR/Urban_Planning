import MonitorModel from "../../../models/moniteringModel";
import {connect,disconnect} from "../../../dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import axios from 'axios';


const delay = (ms)=> new Promise((resolve)=>setTimeout(resolve,ms));


export async function POST(req,res){
    try{

        connect();

        const {regionID}=await req.json();
        const normalImages=await Border.find({regionID});
        // disconnect()

        for(const singleRegion of allMonitorRegions){
            const imageData=singleRegion['imageData'];

            console.log("For region ",singleRegion.regionID);

            for(const singleImageData of imageData){
                const modelPrediction=await axios.post("http://localhost:8080/predict",{
                    image:singleImageData.image.data
                });

                console.log("\t\tImage ID :- ",singleImageData._id);
                
                const updatedImageData=await MonitorModel.updateOne(
                    {"_id":singleRegion._id,"imageData._id":singleImageData._id},
                    {$set:{"imageData.$.classes":modelPrediction.data.classes,"imageData.$.predicted":true}}    
                )

                console.log(updatedImageData);


                // await delay(10000);
            }
        }
        


        return NextResponse.json({"message":"Objects Predicted Successfully"});
    }
    catch(err){
        return NextResponse.json({"message":"Error calling ML Model"},{status:500})
    }
}
