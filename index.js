import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import userRouter from "./routes/user.js";
import connectMongoose from "./connection.js";

connectMongoose("mongodb://127.0.0.1:27017/riveria")
  .then(() => console.log("database connected"))
  .catch(() =>
    console.log("error encountered while connecting to the database")
  );

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", userRouter);

app.listen(PORT, () => console.log("server started"));
