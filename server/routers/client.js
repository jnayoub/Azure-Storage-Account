const express = require("express");
const path = require("path");
const router = express.Router();
const clientFolderPath = path.join(__dirname, "../../client");
router.use(express.static(clientFolderPath));
router.get("/", (req, res) => {
  res.sendFile(path.join(clientFolderPath, "pages/home.html"));
});

router.get("/upload", (req, res) => {
  res.sendFile(path.join(clientFolderPath, "pages/file-upload.html"));
});

router.get("/download", (req, res) => {
  res.sendFile(path.join(clientFolderPath, "pages/file-download.html"));
});

router.get("/list", (req, res) => {
  res.sendFile(path.join(clientFolderPath, "pages/file-list.html"));
});

module.exports = router;
