import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { IUser, IUserLoginResponse } from '../types/User';

class UserService {
  async createUser(userData: IUser): Promise<void> {
    const { email, password, name } = userData;

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error('E-mail já registrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      ...userData,
      password: hashedPassword,
      balance: 0,
    });
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    return user;
  }

  async loginUser(email: string, password: string): Promise<{ token: string; user: any }> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta.');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    };
  }

  async getUserById(id: string): Promise<any> {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }
      return user;
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw error;
    }
  }
}

export default new UserService();
