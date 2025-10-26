import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.Movie || mongoose.model("userDB", userSchema, "users");
export default User;    