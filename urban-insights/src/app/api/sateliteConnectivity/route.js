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


        savedImages.imageData.push({dateTime:Date.now(),image:receivedImage,predicted:false});
    }
    catch(err){
        return NextResponse.status(500).json({
            message:"Error in satelite connectivity"
        })
    }
}