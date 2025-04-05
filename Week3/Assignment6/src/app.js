import api from "./api/index.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", api);

export default app;
