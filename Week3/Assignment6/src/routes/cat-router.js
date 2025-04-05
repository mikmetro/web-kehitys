import express from "express";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";
import multer from "multer";
import { createThumbnail } from "../middlewares.js";
import { authenticateToken } from "../middlewares.js";
const catRouter = express.Router();
const uploadPath = multer({ dest: "uploads/" });

catRouter
  .route("/")
  .get(authenticateToken, getCat)
  .post(authenticateToken, uploadPath.single("file"), createThumbnail, postCat);

catRouter
  .route("/:id")
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;
