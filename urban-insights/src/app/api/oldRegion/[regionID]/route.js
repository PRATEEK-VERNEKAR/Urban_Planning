import cron from 'node-cron';
import axios from 'axios';

import Border from '../../../../models/borderModel';
import {connect} from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import MonitorModel from '../../../../models/moniteringModel';

// cron.schedule('0 * * * * ',async ()=>{
//     const modelUrl='localhost:8080';

//     const allMoniteredModel=await MonitorModel.find({});

//     allMoniteredModel.forEach((MoniteredRegion)=>{
//         MoniteredRegion["imageData"].forEach(async (tempImageData)=>{
//             if(!data["predicted"]){
//                 const res = await axios.post(modelUrl,{image:tempImageData.image});

//                 MoniteredRegion["imageData"].classes=res;

//                 const updatedModel = await MonitorModel.updateOne({_id:MoniteredRegion._id},{$set:newData},{new:true});

//                 console.log(updatedModel);
//             }
//         })
//     })
// })


export async function GET(request,content){
    try{
        connect();
        console.log(content.params.regionID)
        const regionID=content.params.regionID;
        const completeInfo = await Border.find({regionID});

        console.log(completeInfo)
        if(!completeInfo){
            return NextResponse.json({
                message:"No such region monitored"
            },{status:404})
        }


        return NextResponse.json(completeInfo,{status:200})
    }
    catch(err){
        return NextResponse.json({
            message:"Cant access data"
        },{status:500})
    }
}