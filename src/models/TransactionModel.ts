import mongoose, { Model, Schema, Document } from 'mongoose';
import { ITransaction } from '../types/Transaction';

interface ITransactionDocument extends ITransaction, Document {
  _id: mongoose.Types.ObjectId;
}

class TransactionModel {
  private schema: Schema;
  private model: Model<ITransactionDocument>;

  constructor() {
    this.schema = new Schema<ITransactionDocument>(
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['revenue', 'expense'], required: true },
        category: { type: String },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        date: { type: Date, required: true },
      },
      {
        timestamps: true,
      }
    );

    this.model = mongoose.model<ITransactionDocument>('Transaction', this.schema);
  }

  async createTransaction(transactionData: ITransaction): Promise<ITransactionDocument> {
    const transaction = await this.model.create(transactionData);
    return transaction;
  }

  async getUserTransactions(userId: mongoose.Types.ObjectId, month: number, year: number): Promise<ITransactionDocument[]> {
    const transactions = await this.model.find({
      user: userId,
      month,
      year,
    }).sort({ createdAt: -1 });

    return transactions;
  }
}

export default new TransactionModel();
