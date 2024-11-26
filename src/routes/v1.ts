import { Router } from 'express';
import {  loginUser, registerUser } from '../controllers/userController';
import { getUsers,getCountries,getCompany } from '../controllers/commonController';
import { createScheduling,getSchduleReport } from '../controllers/schedulingController';
import { authenticateToken } from '../middleware'; // Import the middleware

const router = Router();

// Public Routes
router.post('/login', loginUser);
router.get('/countries', getCountries);
router.get('/company', getCompany);
// Protected Routes 
router.get('/users', authenticateToken, getUsers);
router.post('/addusers', authenticateToken, registerUser);
router.post('/addSchedule', authenticateToken, createScheduling);
router.get('/getSchedule', authenticateToken, getSchduleReport);
export default router;
