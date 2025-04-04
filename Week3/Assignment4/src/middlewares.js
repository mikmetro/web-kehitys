import sharp from "sharp";

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

export { createThumbnail };
