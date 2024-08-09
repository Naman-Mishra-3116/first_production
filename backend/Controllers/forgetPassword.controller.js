import { User } from "../Models/User.models.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
      expiresIn: "30m",
    });
    const link = `https://backend-gamma-wine.vercel.app/resetPassword/${oldUser._id}/${token}`;

    res.status(200).json({
      message: "Check your email for password reset link",
      error: false,
      success: true,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      auth: {
        user: "typingtestteam@gmail.com",
        pass: "uvaiwreyzuyxrzct",
      },
    });

    const mailOptions = {
      from: "namanwebd@gmail.com",
      to: email,
      subject: "Password Reset Link",
      html: `<a href="${link}">Click here to reset password</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, error: true, success: false });
  }
};
