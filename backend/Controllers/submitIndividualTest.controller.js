import { Test } from "../Models/Test.models.js";
import { User } from "../Models/User.models.js";

export const submitIndiviudalTestController = async function (req, res) {
  try {
    const { wpm, accuracy, time, taken, raw, errorChar, correctChar } =
      req.body;
    const { id } = JSON.parse(req.user);

    const newTest = new Test({
      userId: id,
      wpm,
      accuracy,
      time,
      taken,
      raw,
      errorChar,
      correctChar,
    });
    const savedTest = await newTest.save();
    await User.findByIdAndUpdate(id, { $push: { tests: savedTest._id } });

    res.status(200).json({
      message: "Saved Sucessfully",
      success: true,
      error: null,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal Server error",
      error: error.message,
      status: false,
    });
  }
};
