import express from "express";
import { login, register, resetPassword } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword);

export default router;
