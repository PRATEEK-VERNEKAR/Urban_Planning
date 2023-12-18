import { NextResponse } from "next/server";

import {connect,disconnect} from "@/dbConfig/dbConfig";
// import { NextRequest,NextResponse } from "next/server";
import Report from "@/models/reportModel";

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
        await connect();
        // console.log("HIEIE")
        // console.log(content.params.city)

        const city=content.params.city;

        const cityReport = await Report.find({city:city});

        await disconnect()


        return NextResponse.json(cityReport);
    }
    catch(error){
        // console.log("Some error getting report")
            return NextResponse.json({message:error.message},{status:500})
        }
}