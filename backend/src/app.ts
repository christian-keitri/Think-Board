import express, { Application } from "express";
import { config } from "dotenv";
import rateLimiter from './middleware/rateLimiter';
import morgan from 'morgan';
import appRouter from "./routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

config();

const app: Application = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // if you're using cookies or auth headers
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))

//remove it production
app.use(morgan("dev"));

// Apply middleware directly
app.use(rateLimiter);

app.use("/api/v1", appRouter);

app.get("/ping", (req, res) => {
  res.send("pong");
});

// Serve React frontend (PUT THIS LAST)
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export default app;
