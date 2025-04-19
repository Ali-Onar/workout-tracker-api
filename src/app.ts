import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import workoutRoutes from './routes/workout.routes';
dotenv.config();

const app = express();

// JSON body parser
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Workout Tracker API is running' });
});

app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);

export default app;
