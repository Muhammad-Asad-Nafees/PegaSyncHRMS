import { Router } from 'express';
import { getUsers, loginUser, registerUser } from '../controllers/userController';
import { authenticateToken } from '../middleware'; // Import the middleware

const router = Router();

// Public Routes
router.post('/login', loginUser);

// Protected Routes
router.get('/users', authenticateToken, getUsers);
router.post('/addusers', authenticateToken, registerUser);

export default router;
