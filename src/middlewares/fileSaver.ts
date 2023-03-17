import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    let lastindex: number = file.mimetype.lastIndexOf("/");
    let extension: string = file.mimetype
      .substring(lastindex)
      .replace("/", ".");
    cb(null, `img-${Date.now()}${extension}`);
  },
});

const upload = multer({ storage });

export default upload;
