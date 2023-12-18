import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
)
export const decodeUser = async (token) => {
  const { payload, protectedHeader } = await jwtVerify(token, secret, {
    issuer: 'urn:example:issuer',
    audience: 'urn:example:audience',
  })

  console.log("payload at backend is",payload)

  const user = {
    _id: payload._id,
    username: payload.username,
    deptusername: payload.deptusername,
    email: payload.email,
    assignedRegionID: payload.assignedRegionID,
    isAdmin: payload.isAdmin,
  }

  return user
}
