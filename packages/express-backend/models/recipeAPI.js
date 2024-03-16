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
    strIngredient1: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient2: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient3: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient4: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient5: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient6: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient7: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient8: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient9: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient10: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient11: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient12: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient13: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient14: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
    strIngredient15: {
      // Ingredient 1
      type: String,
      required: true,
      trim: true,
    },
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
