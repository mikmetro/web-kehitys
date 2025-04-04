import express from "express";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";
import multer from "multer";

const catRouter = express.Router();
const uploadPath = multer({ dest: "uploads/" });

catRouter.route("/cat").get(getCat).post(uploadPath.single("file"), postCat);

catRouter.route("/cat/:id").get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
