import MonitorModel from '../../../models/moniteringModel'
import { connect, disconnect } from '../../../dbConfig/dbConfig'
import Border from '@/models/borderModel'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req, res) {
  try {
    await connect()

    const { regionID } = await req.json()
    const normalImagesRes = await Border.find({ regionID }, { normalImages: 1 })

    console.log(normalImagesRes[0]['normalImages'].length)

    const normalImages = normalImagesRes[0]['normalImages']

    for (const singleImage of normalImages) {
      console.log(singleImage._id)

      await connect();

      const {regionID}=await req.json();
      const normalImagesRes=await Border.find({regionID},{normalImages:1});

      await disconnect()

      const modelPrediction = await axios.post(
        'http://localhost:8080/predict',
        {
          image: singleImage.image.data,
        }
      )

      console.log(modelPrediction.data.classes)

      const updatedImageData = await Border.updateOne(
        { regionID: regionID, 'normalImages._id': singleImage._id },
        { $set: { 'normalImages.$.classes': modelPrediction.data.classes } }
      )
    }

    const getClasses = await Border.find({ regionID }).select(
      'normalImages.classes'
    )
    await disconnect()

    const countMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

    getClasses.forEach((doc) => {
      const normalImages = doc.normalImages || []
      normalImages.forEach((image) => {
        const classes = image.classes || []

        classes.forEach((num) => {
          if (countMap.hasOwnProperty(num)) {
            countMap[num]++
          }
        })
      })
    })

    Object.entries(countMap).forEach(([number, count]) => {
      countMap[number] /= normalImagesRes[0]['normalImages'].length
    })

    const threshold = Object.values(countMap)

    console.log(threshold)

    const updateThreshold = await Border.findOneAndUpdate(
      { regionID },
      { $set: { threshold: threshold } }
    )


    return NextResponse.json({ message: 'Thresholds Predicted Successfully' })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error calling ML Model' },
      { status: 500 }
    )
  }
}
