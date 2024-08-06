import { User } from "../Models/User.models.js";
import bcrypt from "bcrypt";
export const changePasswordControllerFunction = async function (req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { username, email } = JSON.parse(req.user);

    const existinUser = await User.findOne({ $or: [{ email }, { username }] });

    if (!existinUser) {
      return res
        .status(403)
        .json({ message: "User not Found", error: true, success: false });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      existinUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Current Password is Wrong for the Current User",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        message: "Passwords do not match!",
        error: true,
        success: false,
      });
    }

    try {
      console.log(newPassword, confirmPassword, "this is password");
      const hasedPassword = await bcrypt.hash(confirmPassword, 10);
      const { acknowledged } = await User.replaceOne(
        { email, username },
        { email, username, password: hasedPassword }
      );
      if (acknowledged) {
        return res
          .status(200)
          .json({ success: true, message: "Password Updated Succesfully" });
      }else{
        return res.status(200).json({success:false,message:"Internal error try again later"})
      }
    } catch (error) {
      return res.status(200).json({
        error: true,
        success: false,
        errorMessage: error.message,
        test: "Error is occuring in changePassword Controller 1",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error: true,
      success: false,
      errorMessage: error.message,
      test: "Error is occuring in changePassword Controller 2",
    });
  }
};
