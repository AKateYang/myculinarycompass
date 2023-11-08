import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    nutrients: {
      type: String,
      default: [],
    },
  },
  { timestamps: true }
);

const Ingredients = mongoose.model("Ingredients", ingredientSchema);
export default Ingredients;
