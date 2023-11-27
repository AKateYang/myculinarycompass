import express from "express";
import {
  getAllPosts, // Import the getAllPosts function
  updatePost, // Import the updatePost function
  deletePost, // Import the deletePost function
  getPost,
  likePost,
  getUserPosts,
  getLazyLoadingPosts,
  saveAndUnsavePosts,
  getComments,
  addComment,
  getRecipeId,
  getPostUser,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post("/lazyLoading/getLazyLoadingPosts/", getLazyLoadingPosts);

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
router.patch("/:_id/like", likePost);

// Route to add a comment to a post without token verification
router.post("/:_id/addComment", addComment);

router.patch("/savePost/:userId/:postId", saveAndUnsavePosts);

router.get("/getComments/:postId", getComments);

router.post("/addComment/:postId", addComment);

router.get("/getRecipeId/:postId", getRecipeId);

router.get("/getPostUser/:postId", getPostUser);

export default router;
