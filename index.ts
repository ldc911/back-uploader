import cors from "cors";
import express from "express";
import "module-alias/register";
import bodyParser from "body-parser";
import consola from "consola";
import morgan from "morgan";
import mongoose from "mongoose";
import { PORT } from "@config/index";
import imagesRoutes from "@routes/image";

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("connexion réussie avec la base de données");
  } catch (error) {
    console.error(error.message);
  }
})();

const app = express();

const startApp = () => {
  app.listen(PORT, () =>
    consola.success({
      badge: true,
      message: `Server linstening on port ${PORT}`,
    })
  );
};

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api/images", imagesRoutes);

app.use(express.static("public"));

startApp();
