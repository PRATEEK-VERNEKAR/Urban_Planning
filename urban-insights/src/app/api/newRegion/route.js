import mongoose from "mongoose";
import {connect} from "@/dbConfig/dbConfig";
import Border from "../../../models/borderModel";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        connect();
        const {name,states,neighborCountry,area,borderLength}=await req.json();
        
        const newRegion=new Border({regionID:1,name,states,neighborCountry,area,borderLength});
        
        console.log("\n\nINDIA\n\n");
        const savedNewRegion = await newRegion.save()
        
        console.log(savedNewRegion);

        console.log("HI")
        return NextResponse.json({
            message:"New Region Added",
            savedNewRegion
        })
    }
    catch(err){
        console.log(err);
        return NextResponse.staus(500).json({
            message:"Error saving new region",
        })
    }
}