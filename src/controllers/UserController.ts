import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { IUser } from '../types/User';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: IUser = req.body;
      await UserService.createUser(userData);

      res.status(201).json({
        message: 'Usuário criado com sucesso!',
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;

    try {
      const user = await UserService.getUserByEmail(email);
      res.status(200).json({
        name: user.name,
        email: user.email,
        balance: user.balance,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log('Login request:', { email }); // Debug log

      const { token, user } = await UserService.loginUser(email, password);
      console.log('Login response from service:', { token, user }); // Debug log

      res.status(200).json({
        message: 'Login bem-sucedido!',
        token,
        user,
      });
    } catch (error: any) {
      console.error('Login error:', error); // Debug log
      res.status(400).json({
        error: error.message,
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log('Get user by ID request:', { id }); // Debug log

      const user = await UserService.getUserById(id);
      console.log('Get user by ID response:', { user }); // Debug log

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      res.status(200).json({
        name: user.name,
        email: user.email,
        balance: user.balance,
      });
    } catch (error: any) {
      console.error('Get user by ID error:', error); // Debug log
      res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default new UserController();
