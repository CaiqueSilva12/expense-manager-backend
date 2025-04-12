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
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      },
      {
        timestamps: true,
      }
    );

    this.model = mongoose.model<ICategoryDocument>('Category', this.schema);
  }

  async create(data: ICategory): Promise<ICategoryDocument> {
    const categoryData = {
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId)
    };
    const category = await this.model.create(categoryData);
    return category;
  }

  async findByUserId(userId: string): Promise<ICategoryDocument[]> {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const categories = await this.model.find({ userId: userObjectId });
      return categories;
    } catch (error) {
      console.error('Error in findByUserId:', error);
      throw error;
    }
  }

  async updateBudget(categoryId: string, budget: number): Promise<ICategoryDocument | null> {
    try {
      const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
      const category = await this.model.findByIdAndUpdate(
        categoryObjectId,
        { budget },
        { new: true }
      );
      return category;
    } catch (error) {
      console.error('Error in updateBudget:', error);
      throw error;
    }
  }
}

export default new CategoryModel(); 