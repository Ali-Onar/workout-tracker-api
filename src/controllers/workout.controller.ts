import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllWorkouts(req: Request, res: Response) {
  const userId = (req as any).userId;

  try {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
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
            weight: exercise.weight,
          })),
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Workout creation failed" });
  }
}
