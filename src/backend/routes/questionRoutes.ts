// src/backend/routes/questionRoutes.ts
import { Router } from 'express';
import { createQuestion, getQuestions, deleteQuestion } from '../controllers/panel/QuestionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/questions', authenticateToken, createQuestion);
router.get('/questions', getQuestions);
router.delete('/questions/:id', authenticateToken, deleteQuestion);

export default router;
