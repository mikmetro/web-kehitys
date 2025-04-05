import express from "express";
import { authLogin, getMe } from "../controllers/auth-controller.js";
import { authenticateToken } from "../middlewares.js";
import { postUser } from "../controllers/user-controller.js";

const authRouter = express.Router();

authRouter.route("/register").post(postUser);
authRouter.route("/login").post(authLogin);
authRouter.route("/me").get(authenticateToken, getMe);
authRouter.route("/logout").get((_, res) => res.sendStatus(200));

export default authRouter;
