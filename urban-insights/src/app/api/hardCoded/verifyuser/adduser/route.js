import { connect, disconnect } from '@/dbConfig/dbConfig'

import Authentication from '@/models/auth.js'
const bcrypt = require('bcrypt')
const fs = require('fs')
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req) {
  try {
    await connect()
    const reqBody = await req.json()
    const {
      email,
      username,
      deptusername,
      password,
      deptpassword,
      assignedRegionID,
      isAdmin,
    } = reqBody

    const salt = await bcrypt.genSalt(10)
    console.log(password)

    const hash1 = await bcrypt.hash(password, salt)
    console.log(hash1)
    const hash2 = await bcrypt.hash(deptpassword, salt)
    const newUser = Authentication({
      email: email,
      username: username,
      deptusername: deptusername,
      password: hash1,
      deptpassword: hash2,
      assignedRegionID: assignedRegionID,
      isAdmin: isAdmin,
    })
    await newUser.save()
    
    await disconnect()
    return NextResponse.json({
      message: 'Successfully added',
      success: true,
      token,
    })
  } catch (err) {
    console.log(err)
  }
}