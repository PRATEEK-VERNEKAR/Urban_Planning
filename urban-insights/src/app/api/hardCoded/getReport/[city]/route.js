import { NextResponse } from "next/server";

import {connect} from "@/dbConfig/dbConfig";
// import { NextRequest,NextResponse } from "next/server";
import Report from "@/models/reportModel";
const fs=require('fs');

// export async function GET() {
//     try{
//         // const params = useParams();
//         // console.log(params);
//         // const cityReport=await Report.find({});
//         // console.log(cityReport);
//         return NextResponse.json({virat:"Kohli"},{status:200})
//     }
//     catch(err:any){
//         console.log("Error fetching city report");
//         return NextResponse.json({message:err.message},{status:500})
//     }
// }


export async function GET(request,content){
    try{
        connect();
        console.log("HIEIE")
        console.log(content.params.city)

        const city=content.params.city;

        const cityReport = await Report.find({city:city});

        console.log(cityReport);

        fs.writeFileSync('tempImageStore/previous.jpg',cityReport.previousImage);
        fs.writeFileSync('tempImageStore/current.jpg',cityReport.currentImage);
        
        return NextResponse.json({virat:"Kohli"});
    }
    catch(err){
        console.log("Some")
    }
}