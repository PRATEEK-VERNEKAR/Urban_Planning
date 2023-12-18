import Border from '../../../../models/borderModel';

import {connect,disconnect} from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import MonitorModel from '../../../../models/moniteringModel';


export async function GET(request,content){
    try{

        await connect();
         const user = JSON.parse(request.headers.get('user'))
         console.log("user at backend is",user)
         console.log("user at content  is",content)
         const allocatedRegions = user.allocatedRegions;

        const regionID=content.params.regionID;
        const checkBorderPresent = await Border.findOne({regionID});

        if(!checkBorderPresent){
            return NextResponse.json({
                message:"No such region monitored"
            },{status:404})
        }

        const completeInfo=await MonitorModel.findOne({regionID});
        console.log(typeof(completeInfo))
        await disconnect();

        return NextResponse.json({completeInfo},{status:200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({
            message:"Cant access data"
        },{status:500})
    }
}