import { connect, disconnect } from '@/dbConfig/dbConfig'
import Border from "../../../../models/borderModel";
import axios from "axios"
import {NextResponse} from "next/server";

export async function POST(req,res){
    try{
        await connect();

        const data= await req.formData();
        
        const image=data.get('image');
        const regionID=data.get('regionID');

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
        

        const newNormalImages={image:{data:buffer,contentType:"image/jpg"},classes:[]}

        console.log(newNormalImages)
        // // console.log("\n\n\n\n")
        checkBorderPresent['normalImages'].push(newNormalImages)

        console.log(checkBorderPresent);

        const updateRes=await Border.findOneAndUpdate({regionID},checkBorderPresent,{new:true})
        console.log(updateRes);

        await disconnect()

        return NextResponse.json({
            "message":"Normal images stored successfully",
            success:true
        },{status:201})

    }
    catch(err){
        NextResponse.json({
            "message":"Cant load normal images",
            success:false
        },{status:500})
    }
}