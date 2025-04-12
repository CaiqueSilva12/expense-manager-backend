import mongoose from "mongoose";

export interface ITransaction {
  user: mongoose.Types.ObjectId;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
  description: string;
  month: number;
  year: number;
  date: Date;
}
