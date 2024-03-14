import mongoose from "mongoose";
import inventoryModel from "./inventory.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getInventory() {
  return inventoryModel.find();
}

// function getIngredients() {
//   return inventoryModel.find({}, 'item -_id');
// }

function findItemById(id) {
  return inventoryModel.findById(id);
}

function addItem(item) {
  const itemToAdd = new inventoryModel(item);
  const promise = itemToAdd.save();
  return promise;
}

function deleteItemById(id) {
  return inventoryModel.findByIdAndDelete(id);
}

function findItemByName(name) {
  return inventoryModel.find({ name: name });
}

export default {
  addItem,
  deleteItemById,
  getInventory,
  findItemById,
  findItemByName,
};
