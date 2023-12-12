import {connect} from '@/dbConfig/dbConfig';

import Authentication from '@/models/auth.js';
const bcrypt = require('bcrypt');
const fs = require('fs');
import { NextRequest,NextResponse } from 'next/server';

export async function POST(req){
        try{
                const reqBody = await req.json();
                // const reqBody = await req.json();
                const username = process.env.USERNAME;
                const password = process.env.PASSWORD;
                const {adminusername,adminpassword} = reqBody;
                console.log(adminusername);
                const isvalid = await bcrypt.compare(adminusername,username);
                if(isvalid){
                    console.log("true");
                    const passisvalid = await bcrypt.compare(adminpassword,password);
                    if(passisvalid){
                        return NextResponse.json({
                            message:"Sucess",
                            success:true
                        })
        
                    }
                    else{
                        return NextResponse.json({message:"Error password incorrect",success:false})
                    }
                }
                else{
                    return NextResponse.json({
                        message:"Error Occured",
                        success:false
                    })
                }
        
              
                
        
        
        
        
            }catch(err){
                console.log(err);
        
            }
        
    

}