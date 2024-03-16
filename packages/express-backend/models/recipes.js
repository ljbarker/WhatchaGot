import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ingredientList: {
      type: Array,
      required: true,
      trim: true,
      validate(value) {
        value.forEach((element) => {
          if (element.length < 2)
            throw new Error("Invalid Ingredient: Must have name and amount.");
        });
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "recipe_list" }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
