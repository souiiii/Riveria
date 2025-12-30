import { getUser } from "../services/auth.js";

export function checkAuth(req, res, next) {
  const token = req.cookies?.uid;
  req.user = null;
  if (!token) return next();
  const user = getUser(token);
  req.user = user;
  next();
}

export function checkAuthorization(roles) {
  return function (req, res, next) {
    const user = req.user;
    if (!user) return res.redirect("/login");

    if (!roles.includes(user.role)) return res.send("Unauthorized Access");

    next();
  };
}
