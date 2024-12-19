import mongoose from 'mongoose';

class Database {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expensedb');
      console.log('Conexão ao MongoDB estabelecida!');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
      process.exit(1);
    }
  }
}

export default new Database();
