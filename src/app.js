import express from "express";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js"
import cookieParser from "cookie-parser";
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

export default app;