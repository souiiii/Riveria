import express from "express";
import { handleUserLogin, handleUserSignUp } from "../controllers/user.js";

const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignUp);

router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

export default router;
