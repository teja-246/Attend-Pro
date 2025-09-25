import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const DB_NAME = "attend-pro"
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected. DB HOST: ${connectionInstance.connection.host}`)
    }
    catch (error) {
        console.log("MONGODB connection ERROR: ", error)
        process.exit(1);
    }
}
export default connectDB;