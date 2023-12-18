const fs = require('fs')
import { connect, disconnect } from '@/dbConfig/dbConfig'
import Authentication from '@/models/auth'

const bcrypt = require('bcrypt');
import { NextRequest,NextResponse } from 'next/server';

export async function POST(req) {
  try {

    await connect()
    const reqBody = await req.json()
    const {username,password}=reqBody;
    const rpassword = process.env.PASSWORD;
    const rusername = process.env.USERNAMEE;
    console.log(process.env.USERNAME);

    // console.log(password)
    // const { adminEmail, adminPassword } = reqBody
    // const user = await Authentication.find({ email: adminEmail })
    await disconnect()
    // const isvalid = await bcrypt.compare(user.password, adminPassword)
    

    if (username===rusername && password===rpassword) {
      return NextResponse.json({
        message: 'Success',
        success: true,
      })
    } else {
      return NextResponse.json({
        message: 'Not an admin',
        success: false,
      })
    }
  } catch (err) {
    return NextResponse.json({
      message: err,
      success: false,
    })
  }
}
