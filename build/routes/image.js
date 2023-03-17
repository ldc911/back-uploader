"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploaderMiddleware_1 = __importDefault(require("../middlewares/uploaderMiddleware"));
const UploadControllers_1 = require("../controllers/UploadControllers");
const router = (0, express_1.Router)();
router.post("/multi-upload", uploaderMiddleware_1.default.array("files"), UploadControllers_1.handleMessage);
router.post("/uploads", UploadControllers_1.addUploads);
router.get("/uploads", UploadControllers_1.getUploads);
exports.default = router;
