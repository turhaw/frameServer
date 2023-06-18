const UserModel = require("../models/User");
 
exports.getAllUsers = async () => {
  return await UserModel.find();
};
 
exports.createUser = async (user) => {
  console.log("create",user)
  return await UserModel.create(user);
};

exports.getUserByUserName = async (userName) => {
  console.log(userName)
  return await UserModel.find({userName});
};
 
// exports.updateBlog = async (id, blog) => {
//   return await BlogModel.findByIdAndUpdate(id, blog);
// };
 
// exports.deleteBlog = async (id) => {
//   return await BlogModel.findByIdAndDelete(id);
// };