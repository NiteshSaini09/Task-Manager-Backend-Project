import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
const veryfyJWT=async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ","")
        if(!token){
            return res.status(401).json({
                success:false,
                message:`Unauthorized access, Please login to continue`
            })
        }
        const decodedToken=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        const user=await UserModel.findById(decodedToken?.id)
        if(!user){
              return res.status(401).json({
                success:false,
                message:`Invalid Access Token`
            })
        }

        req.user=user
        next()

    } catch (error) {
        res.status(401).json({
            success:false,
            message:error?.message
        })
    }

};

export default veryfyJWT