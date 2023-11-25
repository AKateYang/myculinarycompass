import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post("/login", verifyToken, login);

router.post("/register", register);

export default router;
