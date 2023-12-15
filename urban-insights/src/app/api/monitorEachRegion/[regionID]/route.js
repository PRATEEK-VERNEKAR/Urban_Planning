import Border from '../../../../models/borderModel';

import {connect,disconnect} from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import MonitorModel from '../../../../models/moniteringModel';


export async function GET(request,content){
    try{
        connect();
        console.log(content.params.regionID)
        const regionID=content.params.regionID;
        const checkBorderPresent = await Border.findOne({regionID});

        if(!checkBorderPresent){
            return NextResponse.json({
                message:"No such region monitored"
            },{status:404})
        }

        // console.log(regionID)
        await MonitorModel.find({regionID});

        // disconnect();

        return NextResponse.json(completeInfo,{status:200})
    }
    catch(err){
        return NextResponse.json({
            message:"Cant access data"
        },{status:500})
    }
}