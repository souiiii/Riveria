import User from "../models/user.js";
import { setUser } from "../services/auth.js";

export async function handleUserLogin(req, res) {
  const body = req.body;
  if (!body) return res.render("/login", { error: "A" });

  let user = await User.findOne({
    email: body.email,
  });
  if (!user) {
    return res.render("/login", { error: "B" });
  }

  user = user.toObject();

  const hashedPassword = createHmac("sha256", user.salt)
    .update(user.password)
    .digest("hex");

  if (user.password !== hashedPassword)
    return res.render("/login", { error: "C" });

  const token = setUser(user);
  res.cookie("uid", token);

  return res.redirect("/");
}

export async function handleUserSignUp() {}
