import mongoose from "mongoose";

const ShoppingListSchema = new mongoose.Schema(
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
    item: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "shopping_list" },
);

const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);

export default ShoppingList;
