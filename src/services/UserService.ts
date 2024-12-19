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

  async loginUser(email: string, password: string): Promise<{ token: string; user: IUserLoginResponse }> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida.');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    const userResponse: IUserLoginResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      token,
      user: userResponse,
    };
  }
}

export default new UserService();
