import { Router } from 'express';
import { createWorkout, getAllWorkouts } from '../controllers/workout.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllWorkouts);
router.post('/create', authenticateToken, createWorkout);

export default router;
