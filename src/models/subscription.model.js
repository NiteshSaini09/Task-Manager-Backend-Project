import mongoose from "mongoose";
const subscriptionSchema= new mongoose.Schema({
   subscriber:{
        type:String,
        required:true
   },
   channel:{
        type:string,
        required:true
   }
},{timestamps:true})


export const Subscribtion model=mongoose.model("Subscription",subscriptions Hema)