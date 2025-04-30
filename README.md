# workout-tracker-api

This project involves creating a backend system for a workout tracker application where users can sign up, log in, create workout plans, and track their progress. The system will feature JWT authentication, CRUD operations for workouts, and generate reports on past workouts.

## Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ali-Onar/workout-tracker-api.git
   cd workout-tracker-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/workout_tracker"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```
   Replace `username`, `password`, and `your-secret-key` with your actual values.

4. **Set up the database**
   ```bash
   # Create the database
   createdb workout_tracker

   # Run database migrations
   npx prisma migrate dev
   ```

5. **Seed the database with initial exercise data**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the TypeScript project
- `npm start`: Start the production server
- `npm run seed`: Seed the database with initial exercise data
- `npm run lint`: Run ESLint to check code quality
- `npm run lint:fix`: Fix ESLint issues automatically
- `npx prisma studio`: Open prisma studio 

## Requirements

You are required to develop an API for a workout tracker application that allows users to manage their workouts and track their progress. Your first task is to think about the database schema and the API endpoints that will be needed to support the application's functionality. Here are some of the key features you should consider:

### Exercise Data

You should write a data seeder to populate the database with a list of exercises. Each exercise should have a name, description, and category (e.g., cardio, strength, flexibility) or muscle group (e.g., chest, back, legs). Exercises will be used to create workout plans.

### User Authentication and Authorization

Users will be able to sign up, log in, and log out of the application. You should use JWTs for authentication and authorization. Only authenticated users should be able to create, update, and delete workout plans. Needless to say, users should only be able to access their own workout plans.

- **Sign-Up**: Allow users to create an account.
- **Login**: Allow users to log in to their account.
- **JWT**: Use JSON Web Tokens for authentication.

### Workout Management

Users will be able to create their workout plans. Workout plans should consist of multiple exercises, each with a set number of repetitions, sets, and weights. Users should be able to update and delete their workout plans. Additionally, users should be able to schedule workouts for specific dates and times.

- Create Workout: Allow users to create workouts composed of multiple exercises.
- Update Workout: Allow users to update workouts and add comments.
- Delete Workout: Allow users to delete workouts.
- Schedule Workouts: Allow users to schedule workouts for specific dates and times.
- List Workouts: List active or pending workouts sorted by date and time.
- Generate Reports: Generate reports on past workouts and progress.

## Constraints

You are free to choose the programming language and database of your choice. Actual decisions for the database schema, API endpoints, and other implementation details are up to you. However, you should consider the following constraints:

- **Database**: Use a relational database to store user data, workout plans, and exercise data.
- **API**: Develop a RESTful API to interact with the database.
- **Security**: Implement JWT authentication to secure the API endpoints.
- **Testing**: Write unit tests to ensure the correctness of your code.
- **Documentation**: Learn about OpenAPI Specs. Document your API endpoints and provide examples of how to use them.

<hr />
