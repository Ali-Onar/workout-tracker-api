import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// JSON body parser
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Workout Tracker API is running" });
});

export default app;