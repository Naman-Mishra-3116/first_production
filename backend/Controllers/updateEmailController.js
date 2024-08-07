import { User } from "../Models/User.models.js";

export const updateEmailControllerFunction = async (req, res) => {
  try {
    const { id, email: currentEmail } = JSON.parse(req.user);
    const { email } = req.body;

    if (email === currentEmail) {
      return res.status(200).json({
        message: "Please provide a different email",
        success: true,
        error: false,
      });
    }
    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: { email: email } }
    );

    res.status(200).json({
      message: "Email Updated Successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      error: false,
      message: "Email could not be updated",
    });
  }
};
