import mongoose from 'mongoose';

class Database {
  async connect(): Promise<void> {
    try {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }
      
      await mongoose.connect(mongoUri);
      console.log('Conexão ao MongoDB estabelecida!');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
      process.exit(1);
    }
  }
}

export default new Database();
