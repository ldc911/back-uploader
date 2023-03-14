const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { success, error } = require("consola");
const morgan = require("morgan");
const { PORT } = require("./config");

// // initialize db connexion

// (async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/test");
//     console.log("connexion réussie avec la base de donnée");
//   } catch (error) {
//     console.error(error.message);
//   }
// })();

// Import Routes
const imagesRoutes = require("./routes/images");

// Initialize the express application
const app = express();

// Starting Application Function
const startApp = () => {
  app.listen(PORT, () =>
    success({ badge: true, message: `Server started on port ${PORT}` })
  );
};

// Inject the middlewares to our app Object
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Injecting routes in main app
app.use("/api/images", imagesRoutes);

// Setting up the express static directory
app.use(express.static(path.join(__dirname, "./public")));

startApp();
