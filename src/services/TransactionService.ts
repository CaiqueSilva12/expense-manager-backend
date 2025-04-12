import { Transaction } from '../models/TransactionModel';
import { User } from '../models/UserModel';
import { ITransaction } from '../types/Transaction';
import mongoose from 'mongoose';

export class TransactionService {
  static async createTransaction(transactionData: Omit<ITransaction, 'id'>): Promise<ITransaction> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transaction = new Transaction(transactionData);
      await transaction.save({ session });

      // Update user balance
      const user = await User.findById(transactionData.user);
      if (!user) {
        throw new Error('User not found');
      }

      // Update balance based on transaction type
      if (transactionData.type === 'revenue') {
        user.balance += transactionData.amount;
      } else {
        user.balance -= transactionData.amount;
      }

      await user.save({ session });
      await session.commitTransaction();

      return transaction.toObject();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async getTransactionsByUser(userId: string): Promise<ITransaction[]> {
    const transactions = await Transaction.find({ user: userId });
    return transactions.map(transaction => transaction.toObject());
  }

  static async getTransactionById(id: string): Promise<ITransaction | null> {
    const transaction = await Transaction.findById(id);
    return transaction ? transaction.toObject() : null;
  }

  static async updateTransaction(id: string, transactionData: Partial<ITransaction>): Promise<ITransaction | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      const oldAmount = transaction.amount;
      const newAmount = transactionData.amount || oldAmount;
      const amountDiff = newAmount - oldAmount;

      // Update transaction
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        transactionData,
        { new: true, session }
      );

      if (!updatedTransaction) {
        throw new Error('Failed to update transaction');
      }

      // Update user balance
      const user = await User.findById(transaction.user);
      if (!user) {
        throw new Error('User not found');
      }

      if (transaction.type === 'revenue') {
        user.balance += amountDiff;
      } else {
        user.balance -= amountDiff;
      }

      await user.save({ session });
      await session.commitTransaction();

      return updatedTransaction.toObject();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async deleteTransaction(id: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      // Update user balance
      const user = await User.findById(transaction.user);
      if (!user) {
        throw new Error('User not found');
      }

      if (transaction.type === 'revenue') {
        user.balance -= transaction.amount;
      } else {
        user.balance += transaction.amount;
      }

      await user.save({ session });
      await Transaction.findByIdAndDelete(id).session(session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
