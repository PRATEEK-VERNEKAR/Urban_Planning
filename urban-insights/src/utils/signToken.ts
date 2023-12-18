const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
)

import { SignJWT } from 'jose'
import { UserTypes } from './types'

const signToken = async (user: UserTypes) => {
  const jwt = await new SignJWT({
    _id: user._id,
    username: user.username,
    deptusername: user.deptusername,
    email: user.email,
    assignedRegionID: user.assignedRegionID,
    isAdmin: user.isAdmin
  })
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('30d')
    .sign(secret)

  return jwt
}

export default signToken
