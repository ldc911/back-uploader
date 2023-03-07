import cors from "cors";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { success, error } from "consola";
import morgan from "morgan";
import expressWs from "express-ws";
import { PORT } from "./config";

// Import Routes
import imagesRoutes from "./routes/images";

// Initialize the express application
const app = express();

// Starting Application Function
const startApp = () => {
  app.listen(PORT, () =>
    success({ badge: true, message: `Server started on port ${PORT}` })
  );
};

// initialize express-ws
expressWs(app);

// Inject the middlewares to our app Object
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Injecting routes in main app
app.use("/api/images", imagesRoutes);

// Setting up the express static directory
app.use(express.static(path.join(__dirname, "./public")));

startApp();

// the server pick up the '/ws' WebSocket route
app.ws("/ws", async function (ws, req) {
  // we wait for a message and respond to it
  ws.on("message", async function (msg) {
    // If a message occurs, console log it
    console.log(msg);
    // Start listening for messages
    //sending response back to client
    ws.send(
      JSON.stringify({
        append: true,
        returnText: "I am using WebSockets!",
      })
    );
  });
});
