import { UserModel } from "../models/user.model.js";

// -------------register-------------

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists, Please use a different email" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success:false,
        message: error?.message || "Error while registering user" ,

    });
  }
};

// ---------------Login----------

export const login= async(req,res)=>{
  try {
    const {email,password}=req?.body
  const user=await UserModel.findOne({email})
  if(!user){
    return res.status(404).json({
      success:false,
      message:`Invalid email or password`
    })
  }
  const isPasswordMatch=await user.isPasswordMatch(password)
  if(!isPasswordMatch){   
      return res.status(401).json({
      success:false,
      message:`Invalid email or password`
    })
  }

  //Generate Refresh Token And Access Token
  const refreshToken=user.generateRefreshToken()
  const accessToken=user.generateAccessToken()

  user.refreshToken=refreshToken
  await user.save()

  const options={
    httpOnly:true,
    secure:true,
  }

  res.status(200)
  .cookie("refreshToken",refreshToken, options)
  .cookie("accessToken",accessToken, options)
  .json({
    success:true,
    message:`User login success`,
    // refreshToken,
    // accessToken
  })
  } catch (error) {
     res.status(400).json({
      success:false,
      message:`Error while login`
    })
  }
}
