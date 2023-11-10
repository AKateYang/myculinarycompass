import express from "express";
import {
  createPost,   // Already existing import
  getAllPosts,    // Import the getAllPosts function
  updatePost,     // Import the updatePost function
  deletePost,     // Import the deletePost function
  getPost         // Import the getPost function
} from "../controllers/posts.js"; // Make sure the path is correct

const router = express.Router();

// Existing route for creating a recipe
router.post("/createPost", createPost);

// Route to get all posts
router.get("/", getAllPosts);

// Route to get a single post by ID
router.get("/getPost/:postId", getPost);

// Route to update a single post by ID
router.put("/updatePost/:postId", updatePost);

// Route to delete a single post by ID
router.delete("/deletePost/:postId", deletePost);

export default router;