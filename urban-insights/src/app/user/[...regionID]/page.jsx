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

    useEffect(()=>myFunc,[]);


    const [regionIDs,setRegionIDs]=useState(params.regionID);
    const [allMatchingRegions,setAllMatchingRegions]=useState([]);

    return(
        <div className='flex flex-row region lg:w-[768px] h-[512px]'>
            {
                allMatchingRegions.map((singleRegion,index)=>{
                    return(
                        <div key={index} className='w-auto flex flex-col items-center justify-center region-container h-[186px]' style={{cursor:"pointer"}} onClick={()=>{router.push(`/user/eachRegion/${singleRegion.regionID}`)}}>
                            <div>{singleRegion.name}</div>
                            <div>{singleRegion.area.$numberDecimal} m<sup>2</sup></div>
                            <div>{singleRegion.borderLength.$numberDecimal} km</div>
                            <div className='flex flex-row gap-x-3 flex-wrap'>{singleRegion.states.map((state,index1)=>{return(<span className='block' key={index1}>{state}</span>)})}</div>
                            <div className='flex flex-row gap-x-3 flex-wrap mt-1'>{singleRegion.neighborCountry.map((country,index2)=>{return(<span className='block' key={index2}>{country}</span>)})}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

