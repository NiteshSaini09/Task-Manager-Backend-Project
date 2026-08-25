import express from "express";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js"
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/error.middleware.js";
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"task manager api is running"
    })
}); 

app.use("/api/auth/users",userRoutes);
app.use("/api/auth/tasks",taskRoutes);
app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Route Not Found"
    })
});

// Error handling middleware when an error is thrown in the application,
//  it will be caught by this middleware and a response will be sent to the client with the error message and status code.
app.use(errorHandler);

export default app;