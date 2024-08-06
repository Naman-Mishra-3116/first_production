import { Test } from "../Models/Test.models.js";

export const getCurrentDayData = async function (req, res) {
  try {
    const { id } = JSON.parse(req.user);
    const data = await Test.find({ userId: id });
    res.status(200).json({
      message: "Data deliverd Successfully",
      success: true,
      error: null,
      data,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal Error while fulilling current day data request",
      error: error.message,
      success: false,
    });
  }
};
