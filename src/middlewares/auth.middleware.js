import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
const veryfyJWT=async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError("Unauthorized access, Please login to continue",401)
        }
        const decodedToken=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        const user=await UserModel.findById(decodedToken?.id)
        if(!user){
            throw new ApiError("Invalid Access Token",401)
        }

        req.user=user
        next()

    } catch (error) {
       next(error);
    }

};

export default veryfyJWT