import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
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
  errorChar: {
    type: Number,
    required: true,
  },
  correctChar: {
    type: Number,
    required: true,
  },
  raw: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200,
  },
});

export const Test = new mongoose.model("tests", TestSchema);
