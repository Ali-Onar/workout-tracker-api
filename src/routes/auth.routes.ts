import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", async (req, res) => {
    await signup(req, res);
});
router.post("/login", async (req, res) => {
    await login(req, res);
});

export default router;