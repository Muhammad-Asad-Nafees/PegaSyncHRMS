import { Router } from 'express';
import {  loginUser, registerUser } from '../controllers/userController';
import { getUsers,getCountries,getCompany,getLocations,getJobs } from '../controllers/commonController';
import { createScheduling,getSchduleReport } from '../controllers/schedulingController';
import { checkLocation,addTimeClock,getLastEvent,getTimeCareReport} from '../controllers/timeClockController';
import { authenticateToken } from '../middleware'; // Import the middleware

const router = Router();

// Public Routes
router.post('/login', loginUser);
router.get('/countries', getCountries);
router.get('/company', getCompany);
router.get('/jobs', getJobs);
router.get('/locations', getLocations);
// Protected Routes 
router.get('/users', authenticateToken, getUsers);
router.post('/addusers', authenticateToken, registerUser);
router.post('/addSchedule', authenticateToken, createScheduling);
router.get('/getSchedule', authenticateToken, getSchduleReport);
router.post('/checkLocation', authenticateToken, checkLocation);
router.post('/addTimeClock', authenticateToken, addTimeClock);
router.post('/getLastEvent', authenticateToken, getLastEvent);
router.get('/getTimeCareReport', authenticateToken, getTimeCareReport);
export default router;
