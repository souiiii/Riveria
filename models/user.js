import mongoose from "mongoose";
import { createHmac, randomBytes } from "node:crypto";

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

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");
  this.salt = salt;
  this.password = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return false;
  const salt = user.salt;
  const hashedPassword = user.password;

  const newHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (newHashedPassword !== hashedPassword) return false;
  return true;
});

const User = mongoose.model("user", userSchema);

export default User;
