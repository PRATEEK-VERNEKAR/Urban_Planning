import MonitorModel from "../../../models/moniteringModel";
import {connect,disconnect} from "../../../dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import axios from 'axios';


const delay = (ms)=> new Promise((resolve)=>setTimeout(resolve,ms));


export async function GET(req,res){
    try{

        connect();
        const allMonitorRegions=await MonitorModel.find({});
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
        
        // let PredictionArray=[];
        // allMonitorRegions.forEach((singleRegion)=>{
        //     const imageData=singleRegion['imageData'];
        //     imageData.forEach(async (singleImageData)=>{
        //         // const modelPrediction = await fetch("http://localhost:8080/predict",{
        //         //     method:"POST",
        //         //     header:{"Content-Type":'application/json'},
        //         //     body:JSON.stringify({image:singleImageData.image.data})
        //         // })

        //         const regionID=singleRegion.regionID;

        //         console.log(regionID);

        //         const modelPrediction = await axios.post('http://localhost:8080/predict', {
        //             image: singleImageData.image.data
        //         });


        //         console.log(modelPrediction.data)

        //         const modifiedImageData=await MonitorModel.updateOne(
        //             {"_id":singleRegion._id,"imageData._id":singleImageData._id},
        //             {$set:{"imageData.$.classes":modelPrediction.data.classes,"imageData.$.predicted":true}}
        //         );

        //         // PredictionArray.push(modelPrediction.data);
        //     })
        // })

        // console.log(PredictionArray)
        // return NextResponse.json({"HI":"MSG"},{status:200});


        // await Promise.all(allMonitorRegions.map(async (singleRegion)=>{
        //     const imageData=singleRegion['imageData'];

        //     console.log("FOR region ",singleRegion.regionID)
            
        //     await Promise.all(imageData.map(async (singleImageData)=>{
        //         const modelPrediction=await axios.post('http://localhost:8080/predict',{
        //             image:singleImageData.image.data
        //         });
        //         console.log("\t\tImage ID :- ",singleImageData._id);
        //         const updatedImageData=await MonitorModel.updateOne(
        //             {"_id":singleRegion._id,"imageData._id":singleImageData._id},
        //             {$set:{"imageData.$.classes":modelPrediction.data.classes,"imageData.$.predicted":true}}
        //         )

        //         console.log(updatedImageData);
        //     }))
        // }))



        return NextResponse.json({"message":"Objects Predicted Successfully"});
    }
    catch(err){
        return NextResponse.json({"message":"Error calling ML Model"},{status:500})
    }
}
