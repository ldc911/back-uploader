const _ = require("lodash");
const { publisher } = require("../utils/publisher");
const { baseURL } = require("../config");
const Upload = require("../models/UploadManager");

const handleMessage = async (req, res) => {
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
};

const addUploads = async (req, res) => {
  const { uploads } = req.body;
  const data = uploads.map((upload) => ({
    path: upload.path,
    label: Object.keys(upload.result).map((key) => ({
      title: key,
      confidence: upload.result[key].averageConfidence,
      count: upload.result[key].count,
    })),
  }));
  await Upload.insertMany(data);
  res.sendStatus(200);
};

const getUploads = async (req, res) => {
  const response = await Upload.find();
  res.status(200).json(response);
};

module.exports = { handleMessage, addUploads, getUploads };
