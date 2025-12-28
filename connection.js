import mongoose from "mongoose";

export default async function connectMongoose(path) {
  return await mongoose.connect(path);
}
