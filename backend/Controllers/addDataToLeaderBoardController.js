import { LeaderBoard } from "./../Models/LeaderBoard.js";

export const addToLeaderboard = async (req, res) => {
  try {
    const { username } = JSON.parse(req.user);
    const { wpm, taken, accuracy, time } = req.body;
    const exist = await LeaderBoard.findOne({ name: username });
    if (exist) {
      if (exist.wpm < wpm) {
        await LeaderBoard.updateOne(
          { name: username },
          {
            $set: {
              wpm,
              accuracy,
              time,
              taken,
            },
          }
        );
      }
    } else {
      const lb = new LeaderBoard({
        name: username,
        wpm,
        taken,
        accuracy,
        time,
      });
      await lb.save();
    }

    return res.status(200).json({
      message: "Added successfully",
      error: false,
      success: true,
    });
    
  } catch (error) {
    console.log("here the error is: ", error);
    return res
      .status(200)
      .json({ message: error.message, success: false, error: true });
  }
};
