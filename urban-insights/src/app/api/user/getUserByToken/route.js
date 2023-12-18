import { connect, disconnect } from '@/dbConfig/dbConfig'
import { decodeUser } from '../../../../utils/decodeUser'
import { NextResponse } from 'next/server'

export const GET = async (req, res) => {
  try {
    const user = JSON.parse(req.headers.get('user'))
    return NextResponse.json({
      success: 200,
      user,
    })
  } catch (err) {
    return NextResponse.json(
      {
        success: 500,
        message: err,
      },
      { status: 500 }
    )
  }
}
