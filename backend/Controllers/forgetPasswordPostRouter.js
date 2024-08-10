import { User } from "../Models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const forgetPasswordPostRouter = async (req, res) => {
  try {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    const { password } = req.body;

    if (!oldUser) {
      return res
        .status(200)
        .json({ message: "User does not exist", success: false, error: true });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const verify = jwt.verify(token, secret);

    console.log(verify);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    res.status(200).json({
      message: "Password reset Successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(200)
      .json({ message: error.message, success: false, error: true });
  }
};
