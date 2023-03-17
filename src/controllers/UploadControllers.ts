import _ from "lodash";
import { publisher } from "../utils/publisher";
import { baseURL } from "@config/index";
import Upload from "../models/UploadManager";

interface Message {
  fileId?: String;
  wsRoom?: String;
  imagePath?: String;
  path?: String;
}

interface ResultToSave {
  title: String;
  confidence: Number;
  count: Number;
}

interface UploadFile {
  path: String;
  label: Array<ResultToSave>;
}

const handleMessage = async (req, res) => {
  const { files } = req;
  const resp: Array<Message> = [];
  _.forEach(files, (file) => {
    const message: Message = {};
    let path: string = `${__dirname}/${file.path}`;
    path = path.replace("/build/src/controllers/", "/");
    let imagePath: string = file.path.replace("public", baseURL);
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
  const data: Array<UploadFile> = uploads.map((upload) => ({
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

export { handleMessage, addUploads, getUploads };
