const User = require("../models/user");

const getBooksByUserId = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select({ books: 1 }).exec();
  if (!user) throw new Error("User has not been founded");
  return res.json(user.books.reverse());
};

const addUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) throw new Error("User already existed");
  const newUser = new User({ username, password });
  if (password !== "") {
    await newUser.hashPassword();
  }
  await newUser.save();
  return res.json(newUser);
};

const addBookToUser = async (req, res) => {
  const { id } = req.params;
  const { bookName, author, wordCount } = req.body;
  const user = await User.findById(id).exec();
  if (!user) throw new Error("User not existed");
  const book = await User.findOne({ "books.name": bookName }).exec();
  if (book) throw new Error("Book already existed");
  const newBook = { name: bookName, isReaded: false, author, wordCount };
  user.books.addToSet(newBook);
  await user.save();
  return res.json(user.books.reverse());
};

const updateBookFromUser = async (req, res) => {
  const { userId, bookId } = req.params;
  const { bookName, isReaded, author, wordCount } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: userId, "books._id": bookId },
    {
      $set: {
        "books.$.name": bookName,
        "books.$.isReaded": isReaded,
        "books.$.author": author,
        "books.$.wordCount": wordCount,
      },
    },
    { new: true }
  ).exec();
  if (!user) throw new Error("User or book not existed");
  return res.sendStatus(204);
};

const deleteBookFromUser = async (req, res) => {
  const { userId, bookId } = req.params;
  const user = await User.findById(userId).exec();
  if (!user) throw new Error("User not existed");
  user.books.pull({ _id: bookId });
  await user.save();
  return res.sendStatus(204);
};

module.exports = {
  addUser,
  getBooksByUserId,
  addBookToUser,
  updateBookFromUser,
  deleteBookFromUser,
};
