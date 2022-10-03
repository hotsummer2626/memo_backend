const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) throw new Error("User has not been founded");
  const validPassword = await user.validatePassword(password);
  if (!validPassword) throw new Error("Username or password is wrong");
  const token = generateToken({ id: user._id });
  return res.json({ token, username, id: user._id });
};

module.exports = { login };
