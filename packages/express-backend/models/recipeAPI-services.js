import mongoose from "mongoose";
import recipeAPIModel from "./recipeAPI.js";
import dotenv from "dotenv";
import inventoryQueries from "./inventory-services.js";

dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getRecipes() {
  return recipeAPIModel.find();
}

function get50() {
  return recipeAPIModel.find().limit(50);
}

function getRecipeSource(id) {
  return recipeAPIModel.findById(id, "strSource");
}

function findRecipeById(id) {
  return recipeAPIModel.findById(id);
}

async function searchRecByUserIngreds() {
  try {
    const userIngredients = await inventoryQueries.getIngredients(); // Fetch user's ingredients
    const recipes = await recipeAPIModel.find(); // Fetch all recipes

    const matchingRecipes = recipes.filter(recipe => {
      // Check if every ingredient of a recipe is included in the userIngredients array
      let ingredients = [];
      for (let i = 1; i <= 15; i++) {
        ingredients.push(recipe[`strIngredient${i}`]);
      }
      ingredients.every(ingredient => {
        if (ingredient !== null && ingredient !== "" && ingredient !== " " && ingredient !== undefined) {
          userIngredients.includes(ingredient)
        }
      });
    });

    // Return only the IDs of the recipes that match the criteria
    return matchingRecipes.map(recipe => recipe.idMeal);
  } catch (error) {
    console.error('Error searching recipes by user ingredients:', error);
    return [];
  }
}



export default {
  getRecipes,
  get50,
  findRecipeById,
  getRecipeSource,
  searchRecByUserIngreds,
};
