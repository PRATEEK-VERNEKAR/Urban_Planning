'use client'

import { USER_TOKEN } from '@/utils/consts'
import axios from 'axios'
import { useEffect, useState } from 'react'

const BinaryImageDisplay = ({ binaryImageData, mimeType }) => {
  const [dataURL, setDataURL] = useState('')

  useEffect(() => {
    // Convert binary data to base64
    const base64Image = btoa(String.fromCharCode.apply(null, binaryImageData))

    // Create a data URL
    const newDataURL = `data:${mimeType};base64,${base64Image}`

    // Update the state to trigger a re-render with the new data URL
    setDataURL(newDataURL)
  }, [binaryImageData, mimeType])

  return <img src={dataURL} alt="Binary Image" />
}

export default function MonitorEachRegion({ params }) {
  const [currentRegion, setCurrentRegion] = useState([
    {
      dateTime: '',
      predicted: false,
      classes: [],
      image: { contentType: '', data: { type: '', data: [] } },
    },
  ])
  const myFunc = async () => {
    try {
      const monitoredRegionInfo = await axios.get(
        `http://localhost:3000/api/monitorEachRegion/${params.regionID}`,
        {
          headers: {
            Authorization: `Bearer ${USER_TOKEN}`,
          },
        }
      )
      const regionInfo = monitoredRegionInfo.data.completeInfo.imageData
      console.log('regionInfo', regionInfo)
      setCurrentRegion(regionInfo)
    } catch (error) {
      console.log('error at regionId', error)
    }
  }

  useEffect(() => {
    myFunc()
  }, [currentRegion])

  const countOccurances = (arr, num) => {
    return arr.filter((temp) => {
      return +temp.$numberDecimal === num
    }).length
  }

  return (
    <>
      {currentRegion.map((data, index) => {
        return (
          <div key={index}>
            {/* <p>{data.image.data}</p> */}
            {data.image.data.data && (
              <BinaryImageDisplay
                binaryImageData={Uint8Array.from(data.image.data.data)}
                mimeType="image/jpg"
              />
            )}
            <div>{data.dateTime}</div>
            <div>
              <p>Aircrafts : {countOccurances(data.classes, 0)}</p>
              <p>Buildings : {countOccurances(data.classes, 1)}</p>
              <p>Grounds : {countOccurances(data.classes, 2)}</p>
              <p>Roads : {countOccurances(data.classes, 3)}</p>
              <p>Vehicles : {countOccurances(data.classes, 4)}</p>
              <p>Waters : {countOccurances(data.classes, 5)}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}
