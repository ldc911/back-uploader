import _ from "lodash";
import { Router } from "express";
import { baseURL } from "../config";
import uploadMiddleware from "../middlewares/uploaderMiddleware";
import { publisher } from "../services/publisher";

const router = Router();

// @DESC Route to upload single file

router.post(
  "/single-upload",
  uploadMiddleware.single("file"),
  async (req, res) => {
    const message = {};
    const order = 0;
    message.order = order;
    message.imagePath = req.file.path.replace("public", baseURL);
    message.imagePath = message.imagePath
      .split("src")[1]
      .substring(1, imagePath.length);
    publisher(message);
    return res.json({
      message,
    });
  }
);

// @DESC Route to upload multiple file

router.post(
  "/multi-upload",
  uploadMiddleware.array("files"),
  async (req, res) => {
    const { files } = req;
    const resp = [];
    let orderFile = 0;
    _.forEach(files, (file) => {
      let imagePath = file.path.replace("public", baseURL);
      imagePath = imagePath.split("src")[1].substring(1, imagePath.length);
      resp.push(imagePath);
      file.order = orderFile;
      publisher(file);
      orderFile++;
    });
    return res.json(resp);
  }
);

export default router;
