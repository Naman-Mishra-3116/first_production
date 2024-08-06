import { User } from "../Models/User.models.js";
import jwt from "jsonwebtoken";

export const resetPasswordControllerFunction = async (req, res) => {
  try {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });

    if (!oldUser) {
      return res.send("<h1>User does not exist</h1>");
    }

    const secret = process.env.JWT_SECRET + oldUser.password;

    const verify = jwt.verify(token, secret);
    console.log(verify);
    res.render("reset.ejs");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
