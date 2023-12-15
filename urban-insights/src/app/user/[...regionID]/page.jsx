"use client";

import {useRouter, useSearchParams} from 'next/navigation';
import {useState,useEffect} from "react";
import axios from 'axios';
export default function UserDashboard({params}){


    // useEffect(async ()=>{
    //     // let allotedRegionsURL="http://localhost:3000/api/oldRegion";
    //     // params.regionID.map((singleRegionID)=>{
    //     //     allotedRegionsURL=allotedRegionsURL+`/${singleRegionID}`
    //     // })
    //     // console.log(params.regionID);
    //     // console.log(allotedRegionsURL);
    //     // const allotedRegionResponse=await axios.post(allotedRegionsURL);
    // },[]);

    useEffect(async () => {
        const allMatchingRegions=axios.post("http://localhost:3000/api/viewAllotedRegions",{regionIDs});
        // setRegionIDs(allMatchingRegions)
        console.log(allMatchingRegions);
    }, []);


    console.log(params.regionID);
    const [regionIDs,setRegionIDs]=useState([""])
    return(
        <div>
            {
                regionIDs.map((singleRegion)=>{
                    return(
                        <>

                        </>
                    )
                })
            }
        </div>
    )
}