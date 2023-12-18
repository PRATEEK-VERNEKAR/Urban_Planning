"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const BinaryImageDisplay = ({ binaryImageData, mimeType }) => {
  const [dataURL, setDataURL] = useState('');

  useEffect(() => {
    // Convert binary data to base64
    const base64Image = btoa(String.fromCharCode.apply(null, binaryImageData));

    // Create a data URL
    const newDataURL = `data:${mimeType};base64,${base64Image}`;

    // Update the state to trigger a re-render with the new data URL
    setDataURL(newDataURL);
  }, [binaryImageData, mimeType]);
  

  return <img src={dataURL} alt='Binary Image' />;
}

export default function MonitorEachRegion({ params }) {

  const myFunc = async () => {
    const monitoredRegionInfo = await axios.get(`http://localhost:3000/api/monitorEachRegion/${params.regionID}`);
    setCurrentRegion(monitoredRegionInfo.data.completeInfo.imageData);
    setLoaded(true)
  }
  const pram = {width:"56px",boxShadow:"0 0 15px 2px #323643",borderRadius:"8px",columnGap:"4px"};
  const parm1 = {backgroundColor:"#323643",borderRadius:"8px",padding:"4px"}
  useEffect(() => { myFunc() }, [])

  const [currentRegion, setCurrentRegion] = useState([{ dateTime: "", predicted: false, classes: [], image: { contentType: "", data: { type: "", data: [] } } }]);
  const [loaded,setLoaded] = useState(false);

  const countOccurances=(arr,num)=>{
    return arr.filter((temp)=>{return +temp.$numberDecimal===num}).length
  }

  return (
    <div className='flex flex-row eachRegion gap-x-4'>
      {
        (loaded)?(currentRegion.map((data, index) => {
          return (
            <div key={index} className='flex flex-col' style={{width:"256px",borderRadius:"8px",overflow:"hidden"}}>
              {/* <p>{data.image.data}</p> */}
              {
                data.image.data.data &&
                // <BinaryImageDisplay binaryImageData={Uint8Array.from(data.image.data.data)} mimeType='image/jpg' />
                <Image src='/1.png' width={256} height={256} className='w-[256px]' />
              }
              <div>{data.dateTime}</div>
              <div className='flex flex-row flex-wrap justify-between gap-x-2 gap-y-2' style={{padding:"8px"}}>
                <div className='flex flex-row' style={{...pram}} ><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/aircraft.svg" width={24} height={24} className='block' alt="Aircraft" /></div><div className='flex flex-row items-center'><span className='block'>{countOccurances(data.classes,0)}</span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/building.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'>{countOccurances(data.classes,1)}</span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/grounds.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'>{countOccurances(data.classes,2)}</span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/road.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'>{countOccurances(data.classes,3)}</span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/vehicle.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'>{countOccurances(data.classes,4)}</span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/water.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'>{countOccurances(data.classes,5)}</span></div></div>
              </div>
            </div>
          )
        })):(
          <div></div>
        )
      }
    </div>
  )
}
