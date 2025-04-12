import { User } from '../models/User';
import { IUser } from '../types/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  static async createUser(userData: Omit<IUser, 'id'>): Promise<IUser> {
    const { email, password } = userData;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...userData,
      password: hashedPassword
    });

    await user.save();
    return user.toObject();
  }

  static async getUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user ? user.toObject() : null;
  }

  static async authenticateUser(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return token;
  }
}
