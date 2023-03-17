var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _ = require("lodash");
const { publisher } = require("../utils/publisher");
const { baseURL } = require("../config");
const Upload = require("../models/UploadManager");
const handleMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { files } = req;
    const resp = [];
    _.forEach(files, (file) => {
        const message = {};
        let path = `${__dirname}/${file.path}`;
        path = path.replace("/src/controllers/", "/");
        let imagePath = file.path.replace("public", baseURL);
        message.fileId = file.originalname;
        message.wsRoom = req.body.wsRoom;
        message.imagePath = imagePath;
        message.path = path;
        publisher(message);
        resp.push(message);
    });
    return res.sendStatus(200);
});
const addUploads = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { uploads } = req.body;
    const data = uploads.map((upload) => ({
        path: upload.path,
        label: Object.keys(upload.result).map((key) => ({
            title: key,
            confidence: upload.result[key].averageConfidence,
            count: upload.result[key].count,
        })),
    }));
    yield Upload.insertMany(data);
    res.sendStatus(200);
});
const getUploads = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const response = yield Upload.find();
    res.status(200).json(response);
});
module.exports = { handleMessage, addUploads, getUploads };
