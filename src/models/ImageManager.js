const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  path: String,
  result: { confidence: Number, label: String },

  nbOfLabel: Number,
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
