import { LeaderBoard } from "../Models/LeaderBoard.js";

export const getDailyLeaderBoardData = async (req, res) => {
  try {
    const documents = await LeaderBoard.find();
    if (documents) {
      return res.status(200).json({
        message: "Data Retrives successfully!",
        error: false,
        success: true,
      });
    } else {
      return res
        .status(200)
        .json({
          message: "Something went wrong",
          error: false,
          success: false,
        });
    }
  } catch (error) {
    res.status(200).json({
      message: "Error in fetching data from the leaderboard controller",
      success: false,
      error: true,
    });
  }
};
