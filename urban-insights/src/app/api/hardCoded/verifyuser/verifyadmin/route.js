const fs = require('fs')
import { connect, disconnect } from '@/dbConfig/dbConfig'
import Authentication from '@/models/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req) {
  try {
    connect()
    const reqBody = await req.json()
    const password = process.env.PASSWORD
    console.log(password)
    const { adminEmail, adminPassword } = reqBody
    const user = await Authentication.find({ email: adminEmail })
    disconnect()
    const isvalid = await bcrypt.compare(user.password, adminPassword)
    if (user && user.isAdmin && isvalid) {
      return NextResponse.json({
        message: 'Sucess',
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
