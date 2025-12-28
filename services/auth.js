import jwt from "jsonwebtoken";
const secret = process.env.secret;

export function setUser(user) {
  const obj = { email: user.email, _id: user._id, role: user.role };
  const token = jwt.sign(obj, secret);
  return token;
}

export function getUser() {}
