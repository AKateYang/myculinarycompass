import express from "express";
import {
  getAllPosts, // Import the getAllPosts function
  updatePost, // Import the updatePost function
  deletePost, // Import the deletePost function
  getPost,
  likePost,
  getUserPosts,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

// Route to get all posts
router.get("/", getAllPosts);

// Route to get all posts specfic to a user
router.get("/getUserPosts/:userId", getUserPosts);

// Route to get a single post by ID
router.get("/getPost/:postId", getPost);

// Route to update a single post by ID
router.put("/updatePost/:postId", updatePost);

// Route to delete a single post by ID
router.delete("/deletePost/:postId", deletePost);

// Updates likes on a post
router.patch("/:id/like", likePost);

export default router;
