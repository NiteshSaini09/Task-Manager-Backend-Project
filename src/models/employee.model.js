import mongoose from "mongoose";
const employeeSchema=mongoose.Schema({
      name:{
        type:String,
        required:true
},
      age:{
        type:Number,
        required:true,
        min(1),
        max(120)
},
      user:{
        type:mongoose.Types.Schema.ObjectId,
        ref:"User"
}
},{timestamps:true})

export const EmployeeModel=mongoose.model("Employee", employeeSchema)