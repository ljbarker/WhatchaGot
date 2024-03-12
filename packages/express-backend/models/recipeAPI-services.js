import mongoose from "mongoose";
import recipeAPIModel from "./recipeAPI.js";
import dotenv from "dotenv";

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

function getRecipeIngredients() {
    return recipeAPIModel.find({}, 'strIngredients -idMeal');
  }
  
function getRecipeSource(id) {
    return recipeAPIModel.findById(id, 'strSource -idmeal');
  }

function findRecipeById(id) {
  return recipeAPIModel.findById(id);
}

function findRecipeByName(name) {
  return recipeAPIModel.find({ name: name });
}


export default {
  getRecipes,
  getRecipeIngredients,
  findRecipeById,
  findRecipeByName,
  getRecipeSource,
};
