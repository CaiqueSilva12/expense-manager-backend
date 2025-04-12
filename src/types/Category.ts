import mongoose from 'mongoose';

export interface ICategory {
  name: string;
  user: mongoose.Types.ObjectId;
  type: 'revenue' | 'expense';
} 