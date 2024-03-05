import mongoose from "mongoose";
import shoppingListModel from "./shoppinglist.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getShoppingList() {
  return shoppingListModel.find();
}

function findItemById(id) {
  return shoppingListModel.findById(id);
}

function addItem(item) {
  const itemToAdd = new shoppingListModel(item);
  const promise = itemToAdd.save();
  return promise;
}

function deleteItemById(id) {
  return shoppingListModel.findByIdAndDelete(id);
}

function findItemByName(name) {
  return shoppingListModel.find({ name: name });
}

export default {
  addItem,
  deleteItemById,
  getShoppingList,
  findItemById,
  findItemByName,
};
