const mongoose = require("mongoose");
const ImageManager = require("./ImageManager");

const dbConnexion = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("connexion réussie avec la base de donnée");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { dbConnexion };
