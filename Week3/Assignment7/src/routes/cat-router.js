import express from "express";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";
import multer from "multer";
import { createThumbnail, validationErrors } from "../middlewares.js";
import { body } from "express-validator";
import { authenticateToken } from "../middlewares.js";
const catRouter = express.Router();
const uploadPath = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      cb(null, false);
    }
  },
});

catRouter
  .route("/")
  .get(authenticateToken, getCat)
  .post(
    authenticateToken,
    uploadPath.single("file"),
    createThumbnail,
    body("cat_name").trim().exists(),
    body("weight").trim().exists(),
    body("birthdate").trim().exists(),
    validationErrors,
    postCat
  );

catRouter
  .route("/:id")
  .get(getCatById)
  .put(
    authenticateToken,
    body("cat_name").trim().optional(),
    body("weight").trim().optional(),
    body("birthdate").trim().optional(),
    validationErrors,
    putCat
  )
  .delete(authenticateToken, deleteCat);

export default catRouter;
