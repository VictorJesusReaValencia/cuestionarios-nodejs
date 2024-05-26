import { Router } from 'express';
import { login } from '../controllers/panel/AuthController';
import { register } from '../controllers/panel/RegisterController';

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router;
