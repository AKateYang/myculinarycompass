app.post("/api/addRecipe", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error

  const { recipeId, userId } = req.body;

  const user = new ObjectId(userId);
  const recipe = new ObjectId(recipeId);

  var error = "";

  const db = client.db("COP4331Cards");

  const result = await db
    .collection("Users")
    .updateOne({ _id: user }, { $push: { Recipes: recipe } });

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  var ret = { error: error };
  res.status(200).json(ret);
});
