import mongoose, { mongo } from  "mongoose";


export function connect(){
    try{
        // await mongoose.connect("mongodb+srv://mprateekvernekar189:WIBNp48oFt0mNT70@cluster0.oy9ycha.mongodb.net/Hard-Coded?retryWrites=true&w=majority")
        // const connection=mongoose.connection;
        // console.log("HI")
        // connection.on('connected',()=>{
        //     console.log("MongoDB connected beautifully");
        // })
        // connection.on('error',(err)=>{
        //     process.exit();
        // })

        console.log("\nIndia\n");

        mongoose.connect("mongodb+srv://mprateekvernekar189:WIBNp48oFt0mNT70@cluster0.oy9ycha.mongodb.net/Hard-Coded?retryWrites=true&w=majority").then(()=>{
            console.log("Connection successful for mongodb");
        })
        .catch(()=>{
            console.log("Connection failed");
        })
    }
    catch(err){
        // console.log("Something has gone wrong");
    }
}
