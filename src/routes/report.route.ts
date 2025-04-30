import { Router } from 'express';
import { generateWorkoutReport } from '../controllers/report.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, generateWorkoutReport);

export default router;
