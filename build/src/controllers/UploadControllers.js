"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploads = exports.addUploads = exports.handleMessage = void 0;
const lodash_1 = __importDefault(require("lodash"));
const publisher_1 = require("../utils/publisher");
const index_1 = require("@config/index");
const UploadManager_1 = __importDefault(require("../models/UploadManager"));
const handleMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const resp = [];
    lodash_1.default.forEach(files, (file) => {
        const message = {};
        let path = `${__dirname}/${file.path}`;
        path = path.replace("/build/src/controllers/", "/");
        let imagePath = file.path.replace("public", index_1.baseURL);
        message.fileId = file.originalname;
        message.wsRoom = req.body.wsRoom;
        message.imagePath = imagePath;
        message.path = path;
        (0, publisher_1.publisher)(message);
        resp.push(message);
    });
    return res.sendStatus(200);
});
exports.handleMessage = handleMessage;
const addUploads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uploads } = req.body;
    const data = uploads.map((upload) => ({
        path: upload.path,
        label: Object.keys(upload.result).map((key) => ({
            title: key,
            confidence: upload.result[key].averageConfidence,
            count: upload.result[key].count,
        })),
    }));
    yield UploadManager_1.default.insertMany(data);
    res.sendStatus(200);
});
exports.addUploads = addUploads;
const getUploads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield UploadManager_1.default.find();
    res.status(200).json(response);
});
exports.getUploads = getUploads;
