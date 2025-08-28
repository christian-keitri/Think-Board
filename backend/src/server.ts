import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { connectToDatabase } from "./db/db";
import app from "./app"; // ESModule import

const PORT = process.env.PORT || 5001;

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
