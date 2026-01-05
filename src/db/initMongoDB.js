import mongoose from 'mongoose';

const initMongoDB = async () => {
  try {
    const url = process.env.MONGODB_URL;

    console.log('Bağlantı denemesi yapılıyor...');

    if (!url) {
      console.error(
        "KRİTİK HATA: MONGODB_URL tanımlı değil! Render Dashboard'u kontrol et.",
      );
      return;
    }

    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB Bağlantı Hatası Detayı:', error.message);
  }
};

export default initMongoDB;
