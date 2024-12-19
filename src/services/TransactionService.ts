import TransactionModel from '../models/TransactionModel';
import UserModel from '../models/UserModel';
import { ITransaction } from '../types/Transaction';
import mongoose from 'mongoose';

class TransactionService {
  async createTransaction(transactionData: ITransaction): Promise<void> {
    const { user, type, amount, description, month, year } = transactionData;
  
    const userToUpdate = await UserModel.findById(user);
  
    if (!userToUpdate) {
      throw new Error('Usuário não encontrado');
    }
  
    const newTransaction = await TransactionModel.createTransaction(transactionData);
  
    let balanceChange = 0;
  
    if (type === 'revenue') {
      balanceChange = amount;
    }
    else if (type === 'expense') {
      balanceChange = -amount;
    }
  
    await UserModel.updateBalance(user, balanceChange);
  }
  

  async getUserTransactions(userId: mongoose.Types.ObjectId, month: number, year: number): Promise<ITransaction[]> {
    const transactions = await TransactionModel.getUserTransactions(userId, month, year);
    return transactions;
  }
}

export default new TransactionService();
