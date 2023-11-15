import Recipe from "../data-models/Recipe.js";

export const createRecipe = async (req, res) => {
  // incoming: recipeId, userId
  // outgoing: error

  try {
    const {
      recipeName,
      instructions,
      ingredients,
      picturePath,
      continent,
      country,
    } = req.body;

    const newRecipe = new Recipe({
      recipeName,
      ingredients,
      instructions,
      picturePath,
      continent,
      country,
    });
    const savedRecipe = await newRecipe.save();
    res.status(200).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ error: "error: " + err.message });
  }
};

export const getAllRecipes = async (req, res) => {
  // No incoming body is needed to get all recipes
  try {
    // Assuming Recipe is a Mongoose model you would find all documents in the recipes collection.
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const getLazyLoadingRecipes = async (req, res) => {
  try {
    // Use the aggregate method to get a sample of 5 random recipes
    const recipes = await Recipe.aggregate([
      { $sample: { size: 5 } }
    ]);
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const getRecipe = async (req, res) => {
  const { recipeId } = req.params; // Extract the recipe ID from the URL parameters

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { recipeId } = req.params; // Assuming the recipeId is passed as a URL parameter
  const updates = req.body; // All updated fields are expected in the request body

  try {
    // The { new: true } option ensures that the returned document is the modified one.
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updates, { new: true });
    
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params; // Assuming the recipeId is passed as a URL parameter

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};
