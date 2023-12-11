import mongoose from "mongoose";
import {connect} from "@/dbConfig/dbConfig";
import Border from "../../../models/borderModel";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        connect();
        const {name,states,neighborCountry,area,borderLength}=await req.json();
        
        const newRegion=new Border({name,states,neighborCountry,area,borderLength});
        
        const savedNewRegion = await newRegion.save()
        
        return NextResponse.status(201).json({
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