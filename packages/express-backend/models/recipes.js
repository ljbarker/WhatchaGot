import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
    _id : {
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
        if (value.length < 2)
        throw new Error("Invalid Ingredient, must have name and amount.");
    },
    },
},
{ collection: "recipe_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;