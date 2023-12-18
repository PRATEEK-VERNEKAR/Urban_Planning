import {connect,disconnect} from '@/dbConfig/dbConfig';
import Report from '@/models/reportModel';
const fs = require('fs');
import { NextRequest,NextResponse } from 'next/server';

export async function POST(req){
    try{
        await connect();
        // console.log("YUII")
        const reqBody=await req.json();
        // console.log(reqBody)
        const {city,state,buildings,roads,waters}=reqBody;
        
        const previousImageBuffer = fs.readFileSync('/home/prateek/D_Drive/SIH/UrbanInsights/WebAPP/Urban_Planning/urban-insights/src/addImageStore/current.jpg');
        const currentImageBuffer = fs.readFileSync('/home/prateek/D_Drive/SIH/UrbanInsights/WebAPP/Urban_Planning/urban-insights/src/addImageStore/previous.jpg');

        // console.log(previousImageBuffer);
        // console.log(currentImageBuffer);


        const newCity=Report({
            city,state,buildings,roads,waters,
            previousImage:{
                data:previousImageBuffer,
                contentType:'image/jpg'
            },
            currentImage:{
                data:currentImageBuffer,
                contentType:'image/jpg'
            }
        })

        await newCity.save();

        await disconnect()

        return NextResponse.json({
            message:"Report added",
            success:true,
        })
    }
    catch(err){
        console.log("Cant add report");
    }
}