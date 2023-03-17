const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/uploads`);
    },
    filename: (req, file, cb) => {
        console.log(file);
        let lastIndex = file.mimetype.lastIndexOf("/");
        // get the original extension of the file
        let extension = file.mimetype.substring(lastIndex).replace("/", ".");
        // Create the file on the server
        cb(null, `img-${Date.now()}${extension}`);
    },
});
const upload = multer({ storage });
module.exports = upload;
