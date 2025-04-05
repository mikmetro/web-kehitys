import sharp from "sharp";
import jwt from "jsonwebtoken";

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

export { createThumbnail, authenticateToken };
