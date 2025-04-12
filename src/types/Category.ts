import mongoose from 'mongoose';

export interface ICategory {
  name: string;
  budget: number;
  userId: mongoose.Types.ObjectId;
} 