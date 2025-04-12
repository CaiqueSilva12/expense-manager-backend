import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, CategoryController.createCategory);
router.get('/', authenticateToken, CategoryController.getCategories);
router.get('/:id', authenticateToken, CategoryController.getCategoryById);
router.put('/:id', authenticateToken, CategoryController.updateCategory);
router.delete('/:id', authenticateToken, CategoryController.deleteCategory);

export default router; 