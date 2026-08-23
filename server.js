import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/connect.db.js";
dotenv.config();
const startServer=async()=>{
    try{
        await connectDB();
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }catch(err){
        console.log(err?.message, "Error in starting server befeore connecting to database");
    }
}
startServer();