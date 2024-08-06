import { User } from "../Models/User.models.js";
import bcrypt from "bcrypt";

export const signupControllerFunction = async function (req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(409).json({
        message:
          "A user with username or email already exist, Try logging in or using a different username",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signed Up successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", success: false, error });
  }
};
