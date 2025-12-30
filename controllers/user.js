// import { createHmac } from "crypto";
import User from "../models/user.js";
import { setUser } from "../services/auth.js";

export async function handleUserLogin(req, res) {
  const body = req.body;
  console.log(body);
  if (!body) return res.render("login", { error: "A" });

  let user = await User.findOne({
    email: body.email,
  });
  console.log(user);

  if (!user) {
    return res.render("login", { error: "B" });
  }

  user = user.toObject();

  if (!User.matchPassword(body.email, body.password))
    return res.render("login", { error: "C" });

  const token = setUser(user);
  res.cookie("uid", token);

  return res.status(200).redirect("/riveria");
}

export async function handleUserSignUp(req, res) {
  const body = req.body;
  if (!body) return res.render("signup", { error: "A" });

  console.log(body);

  await User.create({
    email: body.email,
    password: body.password,
    fullName: body.fullName,
  });

  return res.status(201).redirect("/riveria");
}
