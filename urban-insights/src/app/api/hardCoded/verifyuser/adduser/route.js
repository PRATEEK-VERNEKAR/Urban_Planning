import { connect } from '@/dbConfig/dbConfig'

import Authentication from '@/models/auth.js'
const bcrypt = require('bcrypt')
const fs = require('fs')
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req) {
  try {
    // let use

    // let newUser;
    connect()
    console.log('MS Dhoni')
    const reqBody = await req.json()
    console.log(reqBody)
    const { email, username, deptusername, password, deptpassword } = reqBody

    const user = await Authentication.find({ email })

    if (user.length) {
      return NextResponse.json({
        message: 'User already exists',
        success: false,
      })
    }

    const salt = await bcrypt.genSalt(10)
    console.log(password)

    console.log('Hi')
    const hash1 = await bcrypt.hash(password, salt)
    console.log(hash1)
    const hash2 = await bcrypt.hash(deptpassword, salt)
    const newUser = Authentication({
      email: email,
      username: username,
      deptusername: deptusername,
      password: hash1,
      deptpassword: hash2,
    })
    console.log(newUser)
    const use = await newUser.save()
    return NextResponse.json({
      message: 'Successfully added',
      success: true,
    })
  } catch (err) {
    console.log(err)
  }
}
