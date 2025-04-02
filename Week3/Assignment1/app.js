import express from "express";
const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

app.get("/api/v1/cat", (_, res) => {
  return res.json({
    cat_id: 1,
    name: "Erkki",
    birthdate: "28/05/2015",
    weight: 5,
    owner: "Antero",
    image: "http://127.0.0.1:3000/public/image.jpg",
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
