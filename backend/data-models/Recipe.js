import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // required: true,
    },
    recipeName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    ingredients: {
      type: Array,
      default: [],
    },
    instructions: {
      type: String,
      require: true,
      min: 2,
    },
    timeToMake: {
      type: String,
      require: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    videoPath: {
      type: String,
      default: "",
    },
    continent: String,
    country: String,
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
