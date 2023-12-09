import {connect} from '@/dbConfig/dbConfig';
import Report from '@/models/reportModel';
const fs = require('fs');

export async function POST(req,res){
    try{
        await connect();

        const reqBody=await req.json();
        const {city,state,buildings,roads,waters,previousImage,currentImage}=reqBody;
        
        const previousImageBuffer = fs.readFileSync('imageStore/previous.jpg');
        const currentImageBuffer = fs.readFileSync('imageStore/current.jpg');


        const newStud=Report({
            city,state,buildings,roads,waters,previousImage:previousImageBuffer,currentImage:currentImageBuffer
        })

        const savedReport = await newStud.save();

        return NextResponse.json({
            message:"Report added",
            success:true,
            savedReport
        })
    }
    catch(err){
        console.log("Cant add report");
    }
}