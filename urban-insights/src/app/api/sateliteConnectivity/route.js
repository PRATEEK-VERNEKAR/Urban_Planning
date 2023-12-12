// import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import Border from "../../../models/borderModel";

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// export const config = {
//     api: {
//       bodyParser: false, // Disabling bodyParser to handle raw binary data
//     },
// };

// export async function POST(request,response){
//     try{
//         const {regionID}= await request.json();

//         console.log(regionID);

//         const savedImages=await Border.find({regionID:regionID});

//         if(!savedImages){
//             return NextResponse.json({
//                 message:"The region is not officially registered"
//             },{status:403})
//         }

//         upload.single('image')(req,res,async (err)=>{
//             if(err){
//                 return NextResponse.json({message:"Internal server error"})
//             }

//             const currentMontitor=await MonitorModel.find({regionID:regionID});
            
//             if(!currentMontitor){
//             const newMonitor=MonitorModel({regionID,"startDateTime":Date.now(),"imageData":[{"dateTime":Date.now(),"image":{data:req.file.buffer,contentType:req.file.mimetype},"predicted":false}]})
            
//             await newMonitor.save()
//             }
//             else{
//                 const tempImageInfo = {"dateTime":Date.now(),"image":{data:req.file.buffer,contentType:req.file.mimetype},"predicted":false};
//                 currentMontitor["imageData"].push(tempImageInfo);
//                 await MonitorModel.findOneAndUpdate({regionID},currentMontitor,{new:true})
//             }
            
//             return NextResponse.json({
//                 "message":`New image saved for ${regionID}`
//             },{status:201})
//         })
//     }
//     catch(err){
//         return NextResponse.json({
//             message:"Error in satelite connectivity"
//         },{status:500})
//     }
// }


import {writeFile} from 'fs/promises';
import { NextResponse } from 'next/server';
import MonitorModel from "../../../models/moniteringModel";

export async function POST(req){
    try{

        const data=await req.formData();
        const image=data.get('image');
        const regionID = data.get('regionID');
        
        
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
            // console.log(newImageSet);
        }
        else{
            console.log("\n\nelse\n\n")

            const updateImageData={dateTime:Date.now(),image:{data:buffer,contentType:"image/jpg"},predicted:false}

            console.log(updateImageData)
            console.log("\n\n\n\n")
            // console.log(checkIfPresentMonitor['imageData'])
            checkIfPresentMonitor['imageData'].push(updateImageData)
            
            await MonitorModel.findOneAndUpdate({regionID},checkIfPresentMonitor,{new:true});
        }
        
        
        
        return NextResponse.json({
            "message":`New image saved for ${regionID}`
        },{status:201})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({
            "message":`Failed to stored image`
        },{status:500})
    }
}