import express from "express";
import {
  createRecipe, // Already existing import
  getAllRecipes,
  getLazyLoadingRecipes, // Import the getAllPosts function
  getRecipe, // Import the getPost function
  updateRecipe, // Import the updatePost function
  deleteRecipe, // Import the deletePost function
  getUserRecipes,
  saveAndUnsaveRecipes,
} from "../controllers/recipes.js"; // Make sure the path is correct

const router = express.Router();

// Existing route for creating a recipe
router.post("/createRecipe", createRecipe);

// Route to get all recipes
router.get("/", getAllRecipes);

router.get("/getLazyLoadingRecipes", getLazyLoadingRecipes);

// Get user recipe
router.get("/getUserRecipe/:userId", getUserRecipes);

// Saved recipes
router.patch("/saveRecipe/:userId/:recipeId", saveAndUnsaveRecipes);

// Route to get a single post by ID
router.get("/getRecipe/:recipeId", getRecipe);

// Route to update a single post by ID
router.put("/updateRecipe/:recipeId", updateRecipe);

// Route to delete a single post by ID
router.delete("/deleteRecipe/:recipeId", deleteRecipe);

export default router;
