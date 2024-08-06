import { User } from "../Models/User.models.js";
import { Test } from "./../Models/Test.models.js";

export const deleteUserController = async function (req, res) {
  try {
    const { id } = JSON.parse(req.user);
    const response = await User.findByIdAndDelete(id);
    const dltTests = await Test.deleteMany({ userId: id });
    console.log(response, dltTests);

    res
      .status(200)
      .json({ message: "deleted Successfullly", success: true, error: false });
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, error: true, message: error.message });
  }
};
