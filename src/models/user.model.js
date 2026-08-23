import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists, Please use a different email"],
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    refreshToken: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  return;
});

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id:this._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRY,
    },
  );
  return refreshToken;
};
userSchema.methods.generateAccessToken = function () { 
    const accessToken = jwt.sign(
        {id:this._id },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRY,
        }
    );
    return accessToken;
};

export const UserModel = mongoose.model("User", userSchema);
