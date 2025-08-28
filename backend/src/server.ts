// server.ts (CommonJS)
import path from "path";
import express from "express";
import { connectToDatabase } from "./db/db";
import app from "./app";

const PORT = process.env.PORT || 5001;

// __dirname works natively
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
