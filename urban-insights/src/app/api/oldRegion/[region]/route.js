import cron from 'node-cron';
import axios from 'axios';

import Border from '@/models/borderSchema'
import {connect} from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import MonitorModel from '../../../../models/moniteringModel';

cron.schedule('0 * * * * ',async ()=>{
    const modelUrl='localhost:8080';

    const allMoniteredModel=await MonitorModel.find({});

    allMoniteredModel.forEach((MoniteredRegion)=>{
        MoniteredRegion["imageData"].forEach(async (tempImageData)=>{
            if(!data["predicted"]){
                const res = await axios.post(modelUrl,{image:tempImageData.image});

                MoniteredRegion["imageData"].classes=res;

                const updatedModel = await MonitorModel.updateOne({_id:MoniteredRegion._id},{$set:newData},{new:true});

                console.log(updatedModel);
            }
        })
    })
})


export async function GET(request,content){
    try{
        connect();
        const region=connect.params.region();
        const completeInfo = await Border.find({name:region});
        if(!completeInfo){
            return NextResponse.status(404).json({
                message:"No such region monitored"
            })
        }


    }
    catch(err){
        return NextResponse.status(500).json({
            message:"Cant access data"
        })
    }
}