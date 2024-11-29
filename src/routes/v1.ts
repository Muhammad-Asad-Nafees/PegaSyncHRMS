import { Router } from 'express';
import {  loginUser, registerUser } from '../controllers/userController';
import { getUsers,getCountries,getCompany,getLocations,getJobs } from '../controllers/commonController';
import { createScheduling,getSchduleReport ,scheduleTypes} from '../controllers/schedulingController';
import { checkLocation,addTimeClock,getLastEvent,getTimeCareReport,getAttendanceTypes} from '../controllers/timeClockController';
import { createClient,createCompany,createLocation,createJobs,createRoles,createPermissions
    ,userRolesAssignment,assignModulePermissions
} from '../controllers/userAccessController';
import { addTimeCorrection } from '../controllers/timeCorrectionController';
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
router.get('/scheduleTypes', authenticateToken, scheduleTypes);
router.get('/getAttendanceTypes', authenticateToken, getAttendanceTypes);
router.post('/addTimeCorrection', authenticateToken, addTimeCorrection);

//user setup apis
router.post('/createClient', authenticateToken, createClient);
router.post('/createCompany', authenticateToken, createCompany);
router.post('/createLocation', authenticateToken, createLocation);
router.post('/createJobs', authenticateToken, createJobs);
router.post('/createRoles', authenticateToken, createRoles);
router.post('/createPermissions', authenticateToken, createPermissions);
router.post('/userRolesAssignment', authenticateToken, userRolesAssignment);
router.post('/assignModulePermissions', authenticateToken, assignModulePermissions);
export default router;
