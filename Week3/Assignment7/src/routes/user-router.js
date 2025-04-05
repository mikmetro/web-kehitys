import express from "express";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getCatsByUserId,
} from "../controllers/user-controller.js";
import { authenticateToken, validationErrors } from "../middlewares.js";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(authenticateToken, getUser)
  .post(
    body("email").trim().isEmail(),
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("passwd").trim().isLength({ min: 8 }),
    validationErrors,
    postUser
  );

userRouter
  .route("/:id")
  .get(getUserById)
  .put(
    body("email").optional().trim().isEmail(),
    body("username")
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric(),
    body("passwd").optional().trim().isLength({ min: 8 }),
    validationErrors,
    authenticateToken,
    putUser
  )
  .delete(authenticateToken, deleteUser);

userRouter.route("/:id/cats").get(getCatsByUserId);

export default userRouter;
