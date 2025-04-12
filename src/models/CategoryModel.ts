import mongoose, { Document, Model } from 'mongoose';
import { ICategory } from '../types/Category';

interface ICategoryModel extends ICategory, Document {}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const CategoryModel: Model<ICategoryModel> = mongoose.model<ICategoryModel>('Category', categorySchema);

export default CategoryModel; 