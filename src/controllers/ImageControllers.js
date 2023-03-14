const _ = require("lodash");
const { publisher } = require("../utils/publisher");
const { baseURL } = require("../config");

const handleMessage = async (req, res) => {
  const { files } = req;
  const resp = [];
  _.forEach(files, (file) => {
    const message = {};
    const path = file.path;
    let imagePath = file.path.replace("public", baseURL);
    imagePath = imagePath.split("src")[1].substring(1, imagePath.length);
    message.fileId = file.originalname;
    message.wsRoom = req.body.wsRoom;
    message.imagePath = imagePath;
    message.path = path;
    publisher(message);
    resp.push(message);
  });
  return res.json(resp);
};

const addUploads = async (req, res) => {
  const { uploads } = req.body;
};

module.exports = { handleMessage, addUploads };
