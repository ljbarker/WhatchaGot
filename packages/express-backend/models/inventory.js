import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
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
    expiration: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "inventory_list" }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
