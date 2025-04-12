import TransactionModel from '../models/TransactionModel';
import UserModel from '../models/UserModel';
import { ITransaction } from '../types/Transaction';
import mongoose from 'mongoose';

class TransactionService {
  async createTransaction(transactionData: ITransaction): Promise<void> {
    const { user, type, amount, description, month, year } = transactionData;
  
    const userObjectId = new mongoose.Types.ObjectId(user);
    const userToUpdate = await UserModel.findById(userObjectId);
  
    if (!userToUpdate) {
      throw new Error('Usuário não encontrado');
    }
  
    const newTransaction = await TransactionModel.createTransaction({
      ...transactionData,
      user: userObjectId
    });
  
    let balanceChange = 0;
  
    if (type === 'revenue') {
      balanceChange = amount;
    }
    else if (type === 'expense') {
      balanceChange = -amount;
    }
  
    await UserModel.updateBalance(userObjectId, balanceChange);
  }
  
  async getUserTransactions(userId: string, month: number, year: number): Promise<ITransaction[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const transactions = await TransactionModel.getUserTransactions(userObjectId, month, year);
    return transactions;
  }
}

export default new TransactionService();
