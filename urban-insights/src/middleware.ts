import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { UserRequest, UserTypes } from './utils/types'

export const corsHeaders = {
  // put the domain here
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function middleware(req: UserRequest, res: NextResponse) {
  if (req.method === 'OPTIONS') {
    return NextResponse.json({}, { headers: corsHeaders })
  }

  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
  )
  // Get the authorization header
  const authorization = req.headers.get('authorization')

  if (authorization && authorization.startsWith('Bearer')) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length)
    try {
      // Verify the token and decode the payload
      const { payload, protectedHeader } = await jwtVerify(token, secret, {
        issuer: 'urn:example:issuer',
        audience: 'urn:example:audience',
      })
      const user = {
        _id: payload._id,
        username: payload.username,
        deptusername: payload.deptusername,
        email: payload.email,
        assignedRegionID: payload.assignedRegionID,
        isAdmin: payload.isAdmin,
      }
      req.user = user as UserTypes
      req.headers.set('user', JSON.stringify(user))
      const res = NextResponse.next()
      res.headers.set('user', JSON.stringify(user))
      return res
    } catch (err) {
      return NextResponse.json({ message: err })
    }
  }


  const res1 = NextResponse.next()
  return res1
}

export const config = {
  matcher: '/api/:path*',
  runtime: 'experimental-edge', // for Edge API Routes only
  unstable_allowDynamic: [
    '**/node_modules/lodash/**/*.js', // use a glob to allow anything in the function-bind 3rd party module
  ],
}
