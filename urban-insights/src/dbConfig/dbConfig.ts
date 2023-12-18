import mongoose, { mongo } from  "mongoose";


export async function connect(){
    try{
        await mongoose.connect("mongodb+srv://mprateekvernekar189:WIBNp48oFt0mNT70@cluster0.oy9ycha.mongodb.net/Hard-Coded?retryWrites=true&w=majority").then(()=>{
            console.log("Connection successful for mongodb");
        })
        .catch(()=>{
            console.log("Connection failed");
        })
    }
    catch(err){
        console.log("Something has gone wrong",err);
    }
}

export async function disconnect(){
    try{
        await mongoose.disconnect().then(()=>{

            console.log("Disconnected successfully");
        })
        .catch(()=>{
            console.log("Disconnection failed");
        })
    }
    catch(err){
        console.log("Something has gone wrong",err);
    }
}
