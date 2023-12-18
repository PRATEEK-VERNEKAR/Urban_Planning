import {writeFile} from 'fs/promises';
import { NextResponse } from 'next/server';
import MonitorModel from "../../../models/moniteringModel";
import Border from '@/models/borderModel';
import { connect ,disconnect} from '@/dbConfig/dbConfig';

export async function POST(req){
    try{
        await connect();
        const data=await req.formData();
        const image=data.get('image');
        const regionID = data.get('regionID');
        
        const checkBorderPresent=await Border.findOne({regionID});

        console.log(checkBorderPresent)

        if(!checkBorderPresent){
            return NextResponse.json({message:"Region Not registered to be monitered"},{status:403});
        }
        
        if(!image){
            return NextResponse.json({"message":"no image found",success:false})
        }
        const byteData=await image.arrayBuffer();
        const buffer=Buffer.from(byteData);
        
        console.log(buffer)
        
        const path=`./public/${image.name}`
        await writeFile(path,buffer);
        
    
        const checkIfPresentMonitor=await MonitorModel.findOne({regionID})
        
        if(!checkIfPresentMonitor){
            console.log("\n\nif\n\n")
            const newMonitor=new MonitorModel({
                regionID:regionID,
                startDateTime:Date.now(),
                imageData:[{
                    dateTime:Date.now(),
                    image:{
                        data:buffer,
                        contentType:"image/jpg"
                    },
                    predicted:false
                }]
            })

            console.log(newMonitor)
            const newImageSet = await newMonitor.save();
        }
        else{
            console.log("\n\nelse\n\n")

            const updateImageData={dateTime:Date.now(),image:{data:buffer,contentType:"image/jpg"},predicted:false}

            console.log(updateImageData)
            // console.log("\n\n\n\n")
            // console.log(checkIfPresentMonitor['imageData'])
            checkIfPresentMonitor['imageData'].push(updateImageData)
            
            await MonitorModel.findOneAndUpdate({regionID},checkIfPresentMonitor,{new:true});
        }
       
        await disconnect();
        
        return NextResponse.json({
            "message":`New image saved for ${regionID}`
        },{status:201})
    }
    catch(err){
        return NextResponse.json({
            "message":`Failed to stored image`
        },{status:500})
    }
}