import mongoose from "mongoose";
import recipeModel from "./recipes.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getRecipes(username) {
  return recipeModel.find({ username: username });
}

function findRecipeByName(name) {
  return recipeModel.find({ name: name });
}

function findRecipeById(id) {
  return recipeModel.findById(id);
}

function addRecipe(recipe) {
  const recipeToAdd = new recipeModel(recipe);
  const promise = recipeToAdd.save();
  return promise;
}

function deleteRecipe(id) {
  return recipeModel.findByIdAndDelete(id);
}

export default {
  getRecipes,
  addRecipe,
  deleteRecipe,
  findRecipeByName,
  findRecipeById,
};
