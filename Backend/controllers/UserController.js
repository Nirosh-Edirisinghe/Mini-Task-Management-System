import userModel from "../models/user.js";
import bcrypt from "bcrypt"

// get all users
const getAllUsers = async (req, res) => {
  try {

    const users = await userModel
      .find()
      .select("-password");

    res.json({
      success: true,
      users,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// add new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { getAllUsers, createUser }