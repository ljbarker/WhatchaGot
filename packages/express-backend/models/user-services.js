import mongoose from "mongoose";
import userModel from "./users.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
/*
function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}
*/

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByUsername(username) {
  return userModel.find({ username: username });
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
}

function deleteUserMany(users) {
  const idsToDelete = users.map((user) => user._id);
  return userModel.findOneAndDelete(idsToDelete);
}

export default {
  addUser,
  findUserByName,
  deleteUser,
  deleteUserMany,
};
