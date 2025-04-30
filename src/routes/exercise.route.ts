import { Router } from 'express';
import { getAllExercises } from '../controllers/exercise.controller';

const router = Router();

router.get('/', getAllExercises); // No auth needed (public list)

export default router;
