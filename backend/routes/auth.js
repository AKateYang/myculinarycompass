import express from "express";
import { login, dashboard } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post("/login", login);
router.post("/dashboard", verifyToken, dashboard);

export default router;
