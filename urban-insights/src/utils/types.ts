import { NextRequest } from 'next/server'
export interface UserTypes {
  _id: string
  username: string
  deptusername: string
  assignedRegionID: [string]
  isAdmin: Boolean
  email: string
}

export interface UserRequest extends NextRequest {
  user: UserTypes
}
