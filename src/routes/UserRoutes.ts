import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authenticateToken } from '../middlewares/authMiddleware';

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/users', UserController.createUser);
    this.router.get('/users/email/:email', authenticateToken, UserController.getUserByEmail);
    this.router.post('/login', UserController.loginUser);
    this.router.get('/users/id/:id', authenticateToken, UserController.getUserById);
  }
}

export default new UserRoutes().router;
