"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uploadSchema = new mongoose_1.default.Schema({
    path: String,
    label: [{ title: String, confidence: Number, count: Number }],
});
const Upload = mongoose_1.default.model("Upload", uploadSchema);
exports.default = Upload;
