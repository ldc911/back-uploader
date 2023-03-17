import { Router } from "express";
import uploadMiddleware from "../middlewares/fileSaver";
import {
  handleMessage,
  addUploads,
  getUploads,
} from "../controllers/UploadControllers";

const router = Router();

router.post("/multi-upload", uploadMiddleware.array("files"), handleMessage);
router.post("/uploads", addUploads);
router.get("/uploads", getUploads);

export default router;
