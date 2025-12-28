import express from "express";
import path from "path";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("home"));

app.listen(PORT, () => console.log("server started"));
