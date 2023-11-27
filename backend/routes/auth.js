import express from "express";
import {
  login,
  register,
  verification,
  resetPassword,
  resetPasswordEmail,
  isVerified,
} from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();
router.post("/register", register);
router.post("/verification", verification);
router.post("/login", login);
router.post("/resetPasswordEmail", resetPasswordEmail);
router.post("/resetPassword", resetPassword);
router.post("/isVerified", isVerified);

export default router;
