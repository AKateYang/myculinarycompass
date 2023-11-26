import express from "express";
import { login, register, verification } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post("/login", login);

router.post("/verification", verification);

router.post("/register", register);

export default router;
