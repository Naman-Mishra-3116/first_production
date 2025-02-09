import { User } from "../Models/User.models.js";
import jwt from "jsonwebtoken";

export const forgetPasswordControllerFunction = async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      return res
        .status(200)
        .json({ message: "User does not exist", success: false, error: true });
    }

    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: email, id: oldUser._id }, secret, {
      expiresIn: "10m",
    });
    const link = `https://typing-pink-three.vercel.app/c0348c00-2862-47dd-ad81-a8952b6f6cf5/${oldUser._id}/${token}`;

    res.status(200).json({
      message: "Check your email for password reset link",
      error: false,
      success: true,
      link,
      old_id: oldUser._id,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, error: true, success: false });
  }
};
