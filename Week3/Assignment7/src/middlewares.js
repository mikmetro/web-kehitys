import sharp from "sharp";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  // TODO: use file path to create 160x160 png thumbnail with sharp
  const file = sharp(`${req.file.path}`);
  file.resize(160, 160);
  file.toFile(`${req.file.path}_thumb`);

  next();
};

const authenticateToken = (req, res, next) => {
  console.log("authenticateToken", req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(res.locals.user);
    next();
  } catch (err) {
    res.status(403).send({ message: "invalid token" });
  }
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

const validationErrors = async (req, res, next) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(", ");
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
};

export {
  createThumbnail,
  authenticateToken,
  notFoundHandler,
  errorHandler,
  validationErrors,
};
