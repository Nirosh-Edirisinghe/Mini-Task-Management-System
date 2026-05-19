import userModel from "../models/user.js";

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

export {getAllUsers}