import jwt from "jsonwebtoken";

export function setUser(user) {
  const secret = process.env.secret;
  const obj = {
    email: user.email,
    _id: user._id,
    role: user.role,
    fullName: user.fullName,
  };
  const token = jwt.sign(obj, secret);
  return token;
}

export function getUser(token) {
  try {
    const secret = process.env.secret;
    const user = jwt.verify(token, secret);
    return user;
  } catch {
    return null;
  }
}
