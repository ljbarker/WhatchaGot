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

function getRecipeIngredients(id) {
  return recipeAPIModel.find({}, "strIngredients -idMeal");
}

function getRecipeSource(id) {
  return recipeAPIModel.findById(id, "strSource -idmeal");
}

function findRecipeById(id) {
  return recipeAPIModel.findById(id);
}

function findRecipeByName(name) {
  return recipeAPIModel.find({ name: name });
}


async function searchRecByUserIngreds() {
    try {
      const userIngredients = await inventoryQueries.getIngredients(); // Fetch user's ingredients
      const recipes = await recipeAPIModel.find(); // Fetch all recipes
  
      const matchingRecipes = recipes.filter(recipe => {
        // strIngredients is an array of all the ingredients per recipe
        // Check if every ingredient of a recipe is included in the userIngredients array
        return recipes.strIngredients.every(ingredient => 
          userIngredients.includes(ingredient)
        );
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
  getRecipeIngredients,
  findRecipeById,
  findRecipeByName,
  getRecipeSource,
  searchRecByUserIngreds,
};
