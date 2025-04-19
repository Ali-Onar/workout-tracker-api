import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function seedExercises() {
  const filePath = path.join(__dirname, '../data/exercises.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const exercises = JSON.parse(data);

  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: exercise
    });
  }

  console.log(`✅ ${exercises.length} exercises seeded`);
}

seedExercises()
  .catch((e) => {
    console.error('Seeder failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
