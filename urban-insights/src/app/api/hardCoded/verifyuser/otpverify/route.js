import { connect, disconnect } from '@/dbConfig/dbConfig'

import Otp from '@/models/otp.js'
import Authentication from '@/models/auth.js'
const bcrypt = require('bcrypt')
const fs = require('fs')
import { NextRequest, NextResponse } from 'next/server'
import signToken from '@/utils/signToken'


export async function POST(req) {
  const reqBody = await req.json()
  const { email, otp } = reqBody

  await connect()

  try {
    const email1 = await Otp.findOne({ email: email })
    const user = await Authentication.findOne({ email })
    console.log('ININD')
    console.log(email1)
    
    const token = await signToken({
      _id: user._id,
      email: user.email,
      username: user.username,
      deptusername: user.deptusername,
      assignedRegionID: user.assignedRegionID,
      isAdmin: user.isAdmin,
    })
    await disconnect()

    if (email1) {
      if (otp === email1.otp) {
        return NextResponse.json(
          {
            message: 'Success',
            success: true,
            token
          },
          { status: 200 }
        )
      } else {
        return NextResponse.json(
          {
            message: 'Fail',
            success: false,
          },
          { status: 403 }
        )
      }
    } else {
      return NextResponse.json(
        {
          message: 'Fail',
          success: false,
        },
        { status: 403 }
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        message: 'Error',
        success: false,
      },
      { status: 500 }
    )
  }
}
