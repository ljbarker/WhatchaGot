import mongoose from "mongoose";
import recipeModel from "./recipes.js";

mongoose.set("debug", true);

mongoose
.connect("mongodb://localhost:27017/recipes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch((error) => console.log(error));

function getRecipes() {
    return recipeModel.find();
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