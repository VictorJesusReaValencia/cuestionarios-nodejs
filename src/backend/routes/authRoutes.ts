import { Router } from 'express';
import { login } from '../controllers/panel/AuthController';

const router = Router();

router.post('/login', login);

export default router;
