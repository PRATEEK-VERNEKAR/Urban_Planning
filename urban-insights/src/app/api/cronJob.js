const cron=require('node-cron');
import MonitorModel from '../../models/moniteringModel';
// import axios from 'axios';


console.log("CRON")
// cron.schedule('* * * * * ',async ()=>{
//     console.log("CRON THE KING");
//     connect();

//     const modelUrl='localhost:8080';

//     const allMoniteredModel=await MonitorModel.find({});

//     console.log(allMoniteredModel);

//     // const res=await axios.post(modelUrl,{image:bufferedImage})

//     // allMoniteredModel.forEach((MoniteredRegion)=>{
//     //     MoniteredRegion["imageData"].forEach(async (tempImageData)=>{
//     //         if(!data["predicted"]){
//     //             const res = await axios.post(modelUrl,{image:tempImageData.image});

//     //             MoniteredRegion["imageData"].classes=res;

//     //             const updatedModel = await MonitorModel.updateOne({_id:MoniteredRegion._id},{$set:newData},{new:true});

//     //             console.log(updatedModel);
//     //         }
//     //     })
//     // })
// })




MonitorModel.find({}).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})

