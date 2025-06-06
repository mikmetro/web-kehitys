import express from "express";
import catRouter from "../routes/cat-router.js";
import userRouter from "../routes/user-router.js";

const router = express.Router();

// bind base url for all cat routes to catRouter
router.use("/", catRouter);
router.use("/", userRouter);

export default router;
