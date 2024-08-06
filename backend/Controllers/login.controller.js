import { User } from "../Models/User.models.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jsonwebtoken from "jsonwebtoken";
config();

export const loginControllerFunction = async function (req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({
        message: "User not found! try signing in or recheck email",
        success: false,
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Incorrect password. Please try again",
        success: false,
      });
    }

    const jwtToken = jsonwebtoken.sign(
      { email, username: existingUser.username, id:existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Logged in successfully!",
      success: true,
      jwtToken,
      email: existingUser.email,
      name: existingUser.username,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
      test: "error occuring in login",
    });
  }
};
