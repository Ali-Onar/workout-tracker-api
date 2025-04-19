import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
dotenv.config();

const app = express();

// JSON body parser
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Workout Tracker API is running" });
});

app.use("/auth", authRoutes);

export default app;