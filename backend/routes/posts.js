import express from "express";
import { posts } from "../controllers/posts.js";

const router = express.Router();

router.post("/createPost", posts);

export default router;
