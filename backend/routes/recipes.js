import express from "express";
import { createRecipe } from "../controllers/recipes.js";

const router = express.Router();

router.post("/createRecipe", createRecipe);
router.get("/", getAllRecipes);

export default router;
