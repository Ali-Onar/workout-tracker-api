import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllWorkouts(req: Request, res: Response) {
  const userId = (req as any).userId;

  try {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      },
      orderBy: {
        scheduledAt: 'asc'
      }
    });

    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function createWorkout(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { title, notes, scheduledAt, exercises } = req.body;

  try {
    const workout = await prisma.workout.create({
      data: {
        title,
        notes,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        userId,
        exercises: {
          create: exercises.map((exercise: any) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight
          }))
        }
      },
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      }
    });

    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Workout creation failed' });
  }
}

export async function getWorkoutById(req: Request, res: Response) {
  const userId = (req as any).userId;
  const workoutId = req.params.id;

  try {
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        exercises: {
          include: { exercise: true }
        }
      }
    });

    if (!workout || workout.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.status(200).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve workout' });
  }
}

export async function updateWorkout(req: Request, res: Response) {
  const userId = (req as any).userId;
  const workoutId = req.params.id;
  const { title, notes, scheduledAt, exercises } = req.body;

  try {
    const existing = await prisma.workout.findUnique({
      where: { id: workoutId },
      include: { exercises: true }
    });

    if (!existing || existing.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // If exercises are sent, update the exercises
    if (Array.isArray(exercises)) {
      await prisma.workoutExercise.deleteMany({
        where: { workoutId }
      });
    }

    const updated = await prisma.workout.update({
      where: { id: workoutId },
      data: {
        title,
        notes,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        ...(Array.isArray(exercises) && {
          exercises: {
            create: exercises.map((ex: any) => ({
              exerciseId: ex.exerciseId,
              sets: ex.sets,
              reps: ex.reps,
              weight: ex.weight
            }))
          }
        })
      },
      include: {
        exercises: {
          include: { exercise: true }
        }
      }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Workout update failed' });
  }
}

export async function deleteWorkout(req: Request, res: Response) {
  const userId = (req as any).userId;
  const workoutId = req.params.id;

  try {
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId }
    });

    if (!workout || workout.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.workout.delete({ where: { id: workoutId } });

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
}
