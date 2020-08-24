const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/upload"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Settings
app.set("port", 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(
  multer({
    storage: storage,
    dest: path.join(__dirname, "public/upload"),
  }).single("image")
);

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", (req, res) => {
  console.log(req.file);
  res.send("upload");
});

app.listen(app.get("port"), () => {
  console.log("server on port ", app.get("port"));
});
