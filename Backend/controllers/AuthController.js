import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import generateToken from "../utils/generateToken.js";
import userModel from "../models/user.js";

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Misssing Details' })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'enter a valid email' })
    }

    if (password.length < 6) {
      return res.json({ success: false, message: 'enter a strong password' })
    }

    // Check  user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
      role: "USER"
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()
    const token = generateToken(user._id, user.role)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = generateToken(user._id, user.role)
      res.json({ success: true, token })
    } else {
      res.status(401).json({ success: false, message: "Invalid credential" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export {registerUser, loginUser}