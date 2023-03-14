import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { startServer } from "./config/server.js";
import { handleError } from "./middleware/errorHandler.js";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

//configure env
dotenv.config();

const app = express();

//middelwares
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/recipes", recipesRouter);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Backend</h1>");
});

// error handler
app.use(handleError);

//run listen
const PORT = process.env.PORT || 8080;
startServer(app, PORT, process.env.CONNECTION_URL);
