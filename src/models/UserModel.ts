import mongoose, { Document, Model } from 'mongoose';
import { IUser } from '../types/User';

interface IUserModel extends IUser, Document {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 }
});

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);

export default UserModel;
