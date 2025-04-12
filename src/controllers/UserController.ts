import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { IUser } from '../types/User';

class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser({ 
        name, 
        email, 
        password,
        balance: 0 
      });
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        name: user.name,
        email: user.email,
        balance: user.balance
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserService.authenticateUser(email, password);
      return res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
