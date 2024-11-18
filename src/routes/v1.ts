import { Router } from 'express';
import { getUsers,loginUser, validateLogin} from '../controllers/userController';
import { validate } from 'uuid';

const router = Router();

router.get('/users', getUsers);
router.post('/login', validateLogin, loginUser);

export default router;
