import mongoose from 'mongoose';

class Database {
  static async connect() {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
}

export default Database;
