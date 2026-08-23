import mongoose from "mongoose";

const connectDB= async function() {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    console.log("MongoDB connected successfully");
}

export default connectDB;