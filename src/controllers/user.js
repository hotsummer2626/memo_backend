const User = require("../models/user");

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).exec();
  if (!user) throw new Error("User has not been founded");
  return res.json(user);
};

const addUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) throw new Error("User already existed");
  const newUser = new User({ username, password });
  await newUser.hashPassword();
  await newUser.save();
  return res.json(newUser);
};

module.exports = { addUser,getUserById };
