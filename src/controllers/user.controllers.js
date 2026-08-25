import { UserModel } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

// -------------register-------------

export const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApiError("Email already exists, Please use a different email",400)
     }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error)
  }
};

// ---------------Login----------

export const login = async (req, res, next) => {
  try {
    const { email, password } = req?.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError("Invalid email or password", 404);
    }
    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
      throw new ApiError("Invalid email or password", 401);
    }

    //Generate Refresh Token And Access Token
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save();

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({
        success: true,
        message: `User login success`,
        // refreshToken,
        // accessToken
      });
  } catch (error) {
    next(error)
  }
};
