import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from './server.js';
import initMongoDB from './db/initMongoDB.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await initMongoDB();

    const app = createServer();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup failed:', err.message);
    process.exit(1);
  }
};

startServer();
