import mongoose from "mongoose";
const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Taske title is must'],
        minlength:2
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:['pending','in-progress','completed'],
        default:'pending'
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'low'
    },
    dueDate:{
        type:Date,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'User refrence is must']
    }


},{timestamps:true})

export const TaskModel=mongoose.model("Task",taskSchema)