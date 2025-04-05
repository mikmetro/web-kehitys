import { getUserByUsername } from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authLogin = async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password)
    return res.sendStatus(400);

  const loginResult = await getUserByUsername(req.body.username);

  if (!loginResult) {
    res.sendStatus(401);
    return;
  }

  if (!bcrypt.compareSync(req.body.password, loginResult.password)) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: loginResult.user_id,
    name: loginResult.name,
    username: loginResult.username,
    email: loginResult.email,
    role: loginResult.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.json({ user: userWithNoPassword, token });
};

const getMe = async (req, res) => {
  console.log("getMe", res.locals.user);
  if (res.locals.user) {
    res.json({ message: "token ok", user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
};

export { authLogin, getMe };
