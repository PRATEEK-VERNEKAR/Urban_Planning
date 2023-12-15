"use client";

import axios from 'axios';
import { useState } from 'react';

export default function MonitorEachRegion({params}){
    console.log(params.regionID);

    const myFunc=async ()=>{
        const monitoredRegionInfo=axios.get(`http://localhost:3000/api/monitorEachRegion/${params.regionID}`);
        console.log(monitoredRegionInfo.data);
    }


    const [currentRegion,setCurrentRegion]=useState({});

    return(
        <>
        </>
    )
}