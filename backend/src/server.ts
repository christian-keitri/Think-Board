import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express"; // make sure this import is here
import { connectToDatabase } from "./db/db";
import app from "./app"; // your Express app

const PORT = process.env.PORT || 5001;

// Serve Vite build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Handle React Router routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
