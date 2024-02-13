import mongoose from "mongoose";
import recipeModel from "./recipes.js";

mongoose.set("debug", true);

mongoose
.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch((error) => console.log(error));

export default {

}