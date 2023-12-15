// "use client";

// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const BinaryImageDisplay = ({binaryImageData,mimeType})=>{
//     const [dataURL,setDataURL]=useState('');

//     useEffect(()=>{
//         const base64Image=btoa(String.fromCharCode.apply(null,binaryImageData));

//         const newDataURL=`data:${mimeType};base64,${base64Image}`;

//         setDataURL(newDataURL);
//     },[binaryImageData,mimeType])

//     return <img src={dataURL} alt='Binary Image'/>
// }

// export default function MonitorEachRegion({params}){
//     console.log(params.regionID);

//     const myFunc=async ()=>{
//         const monitoredRegionInfo=await axios.get(`http://localhost:3000/api/monitorEachRegion/${params.regionID}`);
//         console.log(monitoredRegionInfo.data.completeInfo.imageData);
//         setCurrentRegion(monitoredRegionInfo.data.completeInfo.imageData);
//     }

//     useEffect(()=>{myFunc()},[])

//     const [currentRegion,setCurrentRegion]=useState([{dateTime:"",predicted:false,classes:[],image:{contentType:"",data:{type:"",data:[]}}}]);

//     let binaryImageData;
//     return(
//         <>
//             {
//                 currentRegion.map((data,index)=>{
//                     return(
//                         <div key={index}>
//                             {console.log(data.image.data.data)}
//                             {/* <p>{data.image.data}</p> */}
//                             {
//                                 binaryImageData=Uint8Array.from(data.image.data.data)
//                             }
//                             <BinaryImageDisplay binaryImageData={binaryImageData} mimeType='image/jpg'/>
//                         </div>
//                     )
//                 })
//             }   
//         </>
//     )
// }


"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

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
  console.log(params.regionID);

  const myFunc = async () => {
    const monitoredRegionInfo = await axios.get(`http://localhost:3000/api/monitorEachRegion/${params.regionID}`);
    console.log(monitoredRegionInfo.data.completeInfo.imageData);
    setCurrentRegion(monitoredRegionInfo.data.completeInfo.imageData);
  }

  useEffect(() => { myFunc() }, [])

  const [currentRegion, setCurrentRegion] = useState([{ dateTime: "", predicted: false, classes: [], image: { contentType: "", data: { type: "", data: [] } } }]);

  return (
    <>
      {
        currentRegion.map((data, index) => {
          return (
            <div key={index}>
              {console.log(data.image.data.data)}
              {/* <p>{data.image.data}</p> */}
              {
                // Ensure that binaryImageData is defined before rendering BinaryImageDisplay
                data.image.data.data &&
                <BinaryImageDisplay binaryImageData={Uint8Array.from(data.image.data.data)} mimeType='image/jpg' />
              }
            </div>
          )
        })
      }
    </>
  )
}
