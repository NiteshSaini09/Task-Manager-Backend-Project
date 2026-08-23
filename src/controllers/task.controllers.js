import { TaskModel } from "../models/task.model.js"

export const addTask=async (req,res)=>{
    try {
        const {title,description}=req.body
        const user=req.user?._id
        const task= await TaskModel.create({title,description,user})
        if(!task){
            throw new Error("Can't create Task in DataBase Something went wrong ");
        }
        res.status(200).json({
            success:true,
            message:"New task added Successfully",
            task
        })
    } catch (error) {
        res.status(401).json({
            message:`${error?.message}` ||`Error While Adding New Task`
        })
    }
}