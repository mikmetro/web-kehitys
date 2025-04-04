import express from "express";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";

const catRouter = express.Router();

catRouter.route("/cat").get(getCat).post(postCat);

catRouter.route("/cat/:id").get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
