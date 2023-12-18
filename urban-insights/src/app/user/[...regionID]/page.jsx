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