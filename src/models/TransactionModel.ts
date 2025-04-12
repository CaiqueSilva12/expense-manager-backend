import mongoose, { Document, Model } from 'mongoose';
import { ITransaction } from '../types/Transaction';

interface ITransactionModel extends ITransaction, Document {}

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['revenue', 'expense'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, default: Date.now }
});

const Transaction: Model<ITransactionModel> = mongoose.model<ITransactionModel>('Transaction', transactionSchema);

export default Transaction;
