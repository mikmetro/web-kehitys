import express from "express";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getCatsByUserId,
} from "../controllers/user-controller.js";
import { authenticateToken } from "../middlewares.js";

const userRouter = express.Router();

userRouter.route("/").get(authenticateToken, getUser).post(postUser);

userRouter
  .route("/:id")
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

userRouter.route("/:id/cats").get(getCatsByUserId);

export default userRouter;
