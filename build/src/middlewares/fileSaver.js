"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        let lastindex = file.mimetype.lastIndexOf("/");
        let extension = file.mimetype
            .substring(lastindex)
            .replace("/", ".");
        cb(null, `img-${Date.now()}${extension}`);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
