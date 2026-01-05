import mongoose from 'mongoose';

const initMongoDB = async () => {
  const url = process.env.MONGODB_URL;

  console.log('Mongo connect attempt');

  if (!url) {
    throw new Error('MONGODB_URL missing');
  }

  await mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log('Mongo connected');
};

export default initMongoDB;
