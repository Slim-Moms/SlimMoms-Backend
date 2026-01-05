import mongoose from 'mongoose';

const initMongoDB = async () => {
  try {
    const { MONGODB_URL } = process.env;

    if (!MONGODB_URL) {
      throw new Error('MONGODB_URL environment variable is not defined');
    }

    await mongoose.connect(MONGODB_URL);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default initMongoDB;
