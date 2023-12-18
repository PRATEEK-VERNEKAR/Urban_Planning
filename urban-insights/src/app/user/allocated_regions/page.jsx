'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, use } from 'react'
import axios from 'axios'
import { USER_TOKEN } from '@/utils/consts'
import Cookies from 'js-cookie'

export default function UserDashboard() {
  const [user, setUser] = useState({})
  const router = useRouter()
  const [token, setToken] = useState(USER_TOKEN)
  const [allMatchingRegions, setAllMatchingRegions] = useState([])

  const MatchingRegions = async (assignedRegionID) => {
    if (user && assignedRegionID) {
      const allMatchingRegionsResponse = await axios.post(
        'http://localhost:3000/api/viewAllotedRegions',
        { regionIDs: assignedRegionID }
      )
      setAllMatchingRegions(allMatchingRegionsResponse.data.allMatchRegions)
    }
  }

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
      const fetchedUser = user.data.user
      setUser(fetchedUser)
      await MatchingRegions(fetchedUser.assignedRegionID)
    } catch (error) {
      console.log('got error in fetching user by token ', error)
    }
  }

  useEffect(() => {
    const workUseffect = async () => {
      if (token) {
        await fetchUserByToken(token)
      } else {
        router.push('/login')
      }
    }
    workUseffect()
  }, [token])

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
