import { Router } from 'express';
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout
} from '../controllers/workout.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllWorkouts);
router.post('/create', authenticateToken, createWorkout);
router.get('/:id', authenticateToken, async (req, res) => {
  await getWorkoutById(req, res);
});
router.put('/:id', authenticateToken, async (req, res) => {
  await updateWorkout(req, res);
});
router.delete('/:id', authenticateToken, async (req, res) => {
  await deleteWorkout(req, res);
});

export default router;
