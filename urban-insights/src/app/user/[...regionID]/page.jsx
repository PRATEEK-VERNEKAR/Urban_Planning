'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {USER_TOKEN} from '../../../utils/consts'

export default function UserDashboard() {
  const [user, setUser] = useState({})

  const fetchUserByToken = async (token) => {
    try {
      const user = await axios.get(
        'http://localhost:3000/api/user/getUserByToken',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUser(user.data.user)
    } catch (error) {
      console.log(error)
      return null
    }
  }
 
  const [token, setToken] = useState(USER_TOKEN)

  useEffect(() => {
    
    if (token) {
      fetchUserByToken(token)
    } else {
      router.push('/login')
    }
  }, [])

  const router = useRouter()

  const myFunc = async () => {
    try {
      const allMatchingRegionsResponse = await axios.post(
        'http://localhost:3000/api/viewAllotedRegions',
        { regionIDs: user.regionID }
      )
      setAllMatchingRegions(allMatchingRegionsResponse.data.allMatchRegions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => myFunc, [])

  const [allMatchingRegions, setAllMatchingRegions] = useState([])

  return (
    <div>
      {allMatchingRegions.map((singleRegion, index) => {
        return (
          <div
            key={index}
            className="border-2"
            onClick={() => {
              router.push(`/user/eachRegion/${singleRegion.regionID}`)
            }}
          >
            <p>Name:{singleRegion.name}</p>
            <p>Area:{singleRegion.area.$numberDecimal}</p>
            <p>Border Length:{singleRegion.borderLength.$numberDecimal}</p>
            <p>
              States:
              {singleRegion.states.map((state, index1) => {
                return <span key={index1}>{state}</span>
              })}
            </p>
            <p>
              Neighbor Country:
              {singleRegion.neighborCountry.map((country, index2) => {
                return <span key={index2}>{country},</span>
              })}
            </p>
          </div>
        )
      })}
    </div>
  )
}
