import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      validate(value){
        if (value.length < 2)
          throw new Error("Invalid username, must be at least 3 characters.");
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 7)
          throw new Error("Invalid password, must be at least 8 characters.");
      },
    },
    uid: {
        type: String,
        required: true,
        trim: true,
    }
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;