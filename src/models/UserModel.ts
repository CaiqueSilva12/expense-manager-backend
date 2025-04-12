import mongoose, { Model, Schema, Document } from 'mongoose';
import { IUser } from '../types/User';

interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
}

class UserModel {
  private schema: Schema;
  private model: Model<IUserDocument>;

  constructor() {
    this.schema = new Schema<IUserDocument>(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        balance: { type: Number, default: 0 },
      },
      {
        timestamps: true,
      }
    );

    this.model = mongoose.model<IUserDocument>('User', this.schema);
  }

  async create(userData: IUser): Promise<IUserDocument> {
    const user = await this.model.create(userData);
    return user;
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    const user = await this.model.findOne({ email });
    return user;
  }

  async findById(userId: mongoose.Types.ObjectId): Promise<IUserDocument | null> {
    const user = await this.model.findById(userId);
    return user;
  }

  public async updateBalance(userId: mongoose.Types.ObjectId, amount: number): Promise<void> {
    await this.model.findByIdAndUpdate(userId, {
      $inc: { balance: amount },
    });
  }
}

export default new UserModel();
