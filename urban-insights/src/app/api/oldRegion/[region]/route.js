import Border from '@/models/borderSchema'
import {connect} from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server'

export async function GET(request,content){
    try{
        connect();
        const region=connect.params.region();
        const completeInfo = await Border.find({name:region});
        if(!completeInfo){
            return NextResponse.status(404).json({
                message:"No such region monitored"
            })
        }

        


    }
    catch(err){
        return NextResponse.status(500).json({
            message:"Cant access data"
        })
    }
}