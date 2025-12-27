import express from "express";
import path from "path";

const app = express();
const PORT = 8000;

app.set("engine", "ejs");
app.set("views path", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log("server started"));
