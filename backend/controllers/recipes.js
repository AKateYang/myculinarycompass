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
