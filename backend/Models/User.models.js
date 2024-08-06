import mongoose from "mongoose";

/**
 * @variable = Schema for creating a user Schema for storing the user.
 */
const Schema = mongoose.Schema;

/**
 * @Schema_defination = UserSchema is the defination for the User collection that will hold ther user.
 * @changable = it will further be connected to another collection for storing the database..
 *
 */

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
  tests: [
    {
      type: Schema.Types.ObjectId,
      ref: "tests",
    },
  ],
});

/**
 * @User = this is the record or the document structure which will collectively form the collection in the database.
 */

export const User = new mongoose.model("users", UserSchema);
