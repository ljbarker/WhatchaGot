import mongoose from "mongoose";

const RecipeAPISchema = new mongoose.Schema(
  {
    idMeal: {
      // meal ID
      type: String,
      required: true,
      trim: true,
    },
    strMeal: {
      // Name of meal
      type: String,
      required: true,
      trim: true,
    },
    strIngredients: [
      {
        // ingredient list
        type: String,
        required: true,
        trim: true,
      },
    ],
    strSource: {
      // Link to recipe website
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "recipe_API" }
);

const RecipeAPI = mongoose.model("RecipeAPI", RecipeAPISchema);

export default RecipeAPI;
