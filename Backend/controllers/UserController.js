import cloudinary from "../config/cloudinary.js";
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

// get user data
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  try {
    const imageFile = req.file;
    const userId = req.user.id;

    let imageUrl = "";

    if (imageFile) {
      const uploadRes = await cloudinary.uploader.upload(
        imageFile.path,
        {
          folder: "profiles",
        }
      );

      imageUrl = uploadRes.secure_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        image: imageUrl,
      },
      { returnDocument: "after" }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update user email
const updateUserEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }

    // check if email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already in use",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { email },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Email updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

export { getAllUsers, createUser, getUserProfile, updateUserProfile, updateUserEmail }