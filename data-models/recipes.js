import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        ingredients: {
            type: String,
            default: []
        },
        instructions: {
            type: String,
            require: true,
            min: 2,
        },
        picturePath: {
            type: String,
            default: []
        },
        continent: String,  
        country: String,
    },
    { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema)
export default Recipe;