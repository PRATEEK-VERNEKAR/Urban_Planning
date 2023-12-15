"use client";

import {useRouter} from 'next/navigation';
import {useState,useEffect} from "react";
import axios from 'axios';
export default function UserDashboard({params}){


    console.log(params.regionID);

    const router=useRouter();

    const myFunc=async()=>{
        const allMatchingRegionsResponse=await axios.post("http://localhost:3000/api/viewAllotedRegions",{regionIDs:params.regionID});
        console.log(allMatchingRegionsResponse.data.allMatchRegions);
        setAllMatchingRegions(allMatchingRegionsResponse.data.allMatchRegions);
    }

    useEffect(()=>myFunc,[]);


    const [regionIDs,setRegionIDs]=useState(params.regionID);
    const [allMatchingRegions,setAllMatchingRegions]=useState([]);

    return(
        <div>
            {
                allMatchingRegions.map((singleRegion,index)=>{
                    return(
                        <div key={index} className='border-2' onClick={()=>{router.push(`/user/eachRegion/${singleRegion.regionID}`)}}>
                            <p>Name:{singleRegion.name}</p>
                            <p>Area:{singleRegion.area.$numberDecimal}</p>
                            <p>Border Length:{singleRegion.borderLength.$numberDecimal}</p>
                            <p>States:{singleRegion.states.map((state,index1)=>{return(<span key={index1}>{state}</span>)})}</p>
                            <p>Neighbor Country:{singleRegion.neighborCountry.map((country,index2)=>{return(<span key={index2}>{country},</span>)})}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}