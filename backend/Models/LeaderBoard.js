import mongoose from "mongoose";

const schema = mongoose.Schema;

const leaderBoardSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  wpm: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  taken: {
    type: String,
    required: true,
  },
});

export const LeaderBoard = new mongoose.model("leaderboard", leaderBoardSchema);
