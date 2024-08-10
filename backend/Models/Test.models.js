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
  },
});

const Test = new mongoose.model("tests", TestSchema);
Test.collection
  .createIndex({ createdAt: 1 }, { expireAfterSeconds: 21600 })
  .then(() => {
    console.log("TTL index created successfully");
  })
  .catch((err) => {
    console.error("Error creating TTL index:", err);
  });

export { Test };
