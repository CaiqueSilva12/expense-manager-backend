import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/profile', authenticateToken, UserController.getUserById);

export default router;
