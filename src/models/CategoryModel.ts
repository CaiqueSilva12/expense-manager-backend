import mongoose, { Model, Schema, Document } from 'mongoose';
import { ICategory } from '../types/Category';

interface ICategoryDocument extends ICategory, Document {
  _id: mongoose.Types.ObjectId;
}

class CategoryModel {
  private schema: Schema;
  private model: Model<ICategoryDocument>;

  constructor() {
    this.schema = new Schema<ICategoryDocument>(
      {
        name: { type: String, required: true },
        budget: { type: Number, required: true },
        userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
      },
      {
        timestamps: true,
      }
    );

    this.model = mongoose.model<ICategoryDocument>('Category', this.schema);
  }

  async create(categoryData: ICategory): Promise<ICategoryDocument> {
    const category = await this.model.create(categoryData);
    return category;
  }

  async findByUserId(userId: mongoose.Types.ObjectId): Promise<ICategoryDocument[]> {
    const categories = await this.model.find({ userId });
    return categories;
  }

  async updateBudget(categoryId: mongoose.Types.ObjectId, budget: number): Promise<ICategoryDocument | null> {
    const category = await this.model.findByIdAndUpdate(
      categoryId,
      { budget },
      { new: true }
    );
    return category;
  }
}

export default new CategoryModel(); 