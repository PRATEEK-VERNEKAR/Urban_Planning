'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, use } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function UserDashboard() {
  const [user, setUser] = useState({})
  const router = useRouter()
  const USER_TOKEN = Cookies.get('userToken') ? Cookies.get('userToken') : null
  const [token, setToken] = useState(USER_TOKEN)
  const [allMatchingRegions, setAllMatchingRegions] = useState([])

  const fetchUserByToken = async (token) => {
    console.log('token before call', token)
    try {
      const user = await axios.get(
        'http://localhost:3000/api/user/getUserByToken',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('user is', user.data.user)
      const fetchedUser = user.data.user
      setUser(fetchUserByToken)
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
  }, [])

  useEffect(() => {
    const MatchingRegions = async () => {
      console.log('user in allocated', user)
      if (user && user.assignedRegionID) {
        console.log('user in allocated', user.assignedRegionID)
        const allMatchingRegionsResponse = await axios.post(
          'http://localhost:3000/api/viewAllotedRegions',
          { regionIDs: user.assignedRegionID }
        )
        console.log('allMatchingRegionsResponse', allMatchingRegionsResponse)
        setAllMatchingRegions(allMatchingRegionsResponse.data.allMatchRegions)
      }
    }

    MatchingRegions()
  }, [user])

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
