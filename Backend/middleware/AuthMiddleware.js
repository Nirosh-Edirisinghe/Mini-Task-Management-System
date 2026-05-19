import jwt from "jsonwebtoken"
import userModel from "../models/user.js";

export const Authuser = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({
      success: false,
      message: "Unauthorized Login Again !",
    });
  }
  const token = authHeader.split(" ")[1];  

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(token_decode.id).select("-password");
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  if (!token) {
    res.status(401).json({ message: "No token" });
  }

}

// Role-based access
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};