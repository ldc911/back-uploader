const mongoose = require("mongoose");
const uploadSchema = new mongoose.Schema({
    path: String,
    label: [{ title: String, confidence: Number, count: Number }],
});
const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
