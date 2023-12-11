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

                const updatedModel = await MonitorModel.updateOne({_id:MoniteredRegion._id},{$set:MoniteredRegion},{new:true});

                console.log(updatedModel);
            }
        })
    })
})


export async function GET(request,content){
    try{
        connect();
        const region=content.params.region();
        const {regionID}=await request.json();
        const completeInfo = await Border.find({name:region});
        if(!completeInfo){
            return NextResponse.status(404).json({
                message:"No such region monitored"
            })
        }

        const allMoniteredModel=await MonitorModel.find({regionID});

        return NextResponse.status(200).json(allMoniteredModel);
    }
    catch(err){
        return NextResponse.status(500).json({
            message:"Cant access data"
        })
    }
}