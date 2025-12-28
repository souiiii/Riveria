import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/defaultProfile.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      required: true,
      default: "USER",
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export default user;
