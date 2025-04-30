import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllExercises(req: Request, res: Response) {
  try {
    const exercises = await prisma.exercise.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
}
