import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("Missing MONGO_URI in environment");

    await connect(mongoUri); // ✅ No options needed for Mongoose 7+

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Cannot Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Disconnect error:", error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
