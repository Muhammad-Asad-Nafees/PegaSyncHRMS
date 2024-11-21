import { Router } from 'express';
import { getUsers,loginUser, registerUser,validateLogin} from '../controllers/userController';
import { validate } from 'uuid';

const router = Router();

router.get('/users', getUsers);
router.post('/login', validateLogin, loginUser);

router.post('/addusers', validateLogin, registerUser);

export default router;
