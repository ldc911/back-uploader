const _ = require("lodash");
const { Router } = require("express");
const uploadMiddleware = require("../middlewares/uploaderMiddleware");

const {
  handleMessage,
  addUploads,
  getUploads,
} = require("../controllers/UploadControllers");

const router = Router();

// @DESC Route to upload multiple file

router.post("/multi-upload", uploadMiddleware.array("files"), handleMessage);
router.post("/uploads", addUploads);
router.get("/uploads", getUploads);

module.exports = router;
