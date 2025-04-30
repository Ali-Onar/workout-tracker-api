import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateWorkoutReport(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { from, to } = req.query;

  const fromDate = from ? new Date(from as string) : new Date('2000-01-01');
  const toDate = to ? new Date(to as string) : new Date();

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
        scheduledAt: {
          gte: fromDate,
          lte: toDate
        }
      },
      include: {
        exercises: {
          include: { exercise: true }
        }
      }
    });

    const report = {
      totalWorkouts: workouts.length,
      totalExercises: workouts.reduce((sum, w) => sum + w.exercises.length, 0),
      totalSets: workouts.reduce(
        (sum, w) => sum + w.exercises.reduce((s, ex) => s + ex.sets, 0),
        0
      ),
      totalReps: workouts.reduce(
        (sum, w) => sum + w.exercises.reduce((s, ex) => s + ex.reps * ex.sets, 0),
        0
      )
    };

    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
}
