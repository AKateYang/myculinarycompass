import express from "express";
import { login, register, verification } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();
router.post("/register", register);
router.get("/verification/:token/:email", verification);
router.post("/login", login);

export default router;
