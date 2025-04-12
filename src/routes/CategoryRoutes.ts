import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import { authenticateToken } from '../middlewares/authMiddleware';

class CategoryRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/categories', authenticateToken, CategoryController.createCategory);
    this.router.get('/categories/:userId', authenticateToken, CategoryController.getUserCategories);
    this.router.put('/categories/:categoryId/budget', authenticateToken, CategoryController.updateCategoryBudget);
  }
}

export default new CategoryRoutes().router; 