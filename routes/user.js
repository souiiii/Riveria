import express from "express";
import { handleUserLogin, handleUserSignUp } from "../controllers/user.js";
import { checkAuthorization } from "../middlewares/user.js";

const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignUp);

router.get("/login", (req, res) => {
  return res.render("login", { user: req.user });
});
router.get("/signup", (req, res) => {
  return res.render("signup", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.user = null;
  res.clearCookie("uid");
  return res.redirect("/login");
});

export default router;
