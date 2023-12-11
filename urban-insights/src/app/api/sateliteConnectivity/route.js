import mongoose from "mongoose";
import MonitorModel from "../../../models/moniteringModel";
import { NextResponse } from "next/server";
import Border from "../../../models/borderModel";


export async function POST(request,response){
    try{
        const {regionID,receivedImage}= await request.json();

        const savedImages=await Border.find({regionID:regionID});

        if(!savedImages){
            return NextResponse.status(403).json({
                message:"The region is not officially registered"
            })
        }

        const currentMontitor=await MonitorModel.find({regionID:regionID});

        if(!currentMontitor){
            const newMonitor=MonitorModel({regionID,"startDateTime":Date.now(),"imageData":[{"dateTime":Date.now(),"image":receivedImage,"predicted":false}]})

            await newMonitor.save()
        }
        else{
            const tempImageInfo = {"dateTime":Date.now(),"image":receivedImage,"predicted":false};
            currentMontitor["imageData"].push(tempImageInfo);
            await MonitorModel.findOneAndUpdate({regionID},currentMontitor,{new:true})
        }

        return NextResponse.status(201).json({
            "message":`New image saved for ${regionID}`
        })
    }
    catch(err){
        return NextResponse.status(500).json({
            message:"Error in satelite connectivity"
        })
    }
}