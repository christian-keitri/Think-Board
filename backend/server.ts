import app from './app.js'; // ✅ Import the Express instance
import { connectToDatabase } from './src/db/db.js'; // ✅ Use .js extension due to NodeNext
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// For __dirname in ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;

app.get('/ping', (req, res) => {
  res.send('pong');
});

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();
