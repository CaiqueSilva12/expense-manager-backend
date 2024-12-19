import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import { authenticateToken } from '../middlewares/authMiddleware';

class TransactionRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/transactions', authenticateToken, TransactionController.createTransaction);
    this.router.get('/transactions/:userId', authenticateToken, TransactionController.getUserTransactions);
  }
}

export default new TransactionRoutes().router;
