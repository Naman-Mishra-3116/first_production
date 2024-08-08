import { LeaderBoard } from "../Models/LeaderBoard.js";

export const getDailyLeaderBoardData = async (req, res) => {
  try {
    let documents = await LeaderBoard.find();
    documents = documents.sort((a, b) => b.wpm - a.wpm);
    if (documents.length >= 50) {
      await LeaderBoard.deleteMany({
        _id: { $in: documents.slice(50).map((item) => item._id) },
      });

      documents = documents.slice(0, 50);
    }

    return res.status(200).json({
      message: "Data delivered Successfully",
      success: true,
      error: false,
      data: documents,
    });
  } catch (error) {
    res.status(200).json({
      message: "Error in fetching data from the leaderboard controller",
      success: false,
      error: true,
    });
  }
};
