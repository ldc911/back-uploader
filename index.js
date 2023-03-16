const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { success, error } = require("consola");
const morgan = require("morgan");
const { PORT } = require("./src/config");
const imagesRoutes = require("./src/routes/images");
const mongoose = require("mongoose");

// initialize db connexion
(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("connexion réussie avec la base de donnée");
  } catch (error) {
    console.error(error.message);
  }
})();

const app = express();

const startApp = () => {
  app.listen(PORT, () =>
    success({ badge: true, message: `Server started on port ${PORT}` })
  );
};

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api/images", imagesRoutes);

app.use(express.static("public"));

startApp();
