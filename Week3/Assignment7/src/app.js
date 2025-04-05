import api from "./api/index.js";
import express from "express";
import cors from "cors";
import {
  notFoundHandler,
  errorHandler,
  validationErrors,
} from "./middlewares.js";

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", api);

app.use(notFoundHandler);
app.use(errorHandler);
app.use(validationErrors);

export default app;
