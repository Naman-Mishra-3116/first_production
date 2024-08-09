import { User } from "../Models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const forgetPasswordPostRouter = async (req, res) => {
  try {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    const { password, confirmPassword } = req.body;

    if (!oldUser) {
      return res.status(500).send("<h1>User does not exist</h1>");
    }

    const secret = process.env.JWT_SECRET + oldUser.password;
    const verify = jwt.verify(token, secret);

    console.log(verify);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    res.redirect("https://typing-pink-three.vercel.app/login");
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in post router, ", error.message);
  }
};
