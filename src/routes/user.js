const express = require("express");
const {
  addUser,
  getBooksByUserId,
  addBookToUser,
  deleteBookFromUser,
} = require("../controllers/user");
const authGuard = require("../middlewares/authGuard");

const router = express.Router();

router.post("/", addUser);
router.get("/:id/books", authGuard, getBooksByUserId);
router.post("/:id", authGuard, addBookToUser);
router.put("/:userId/books/:bookId", authGuard, deleteBookFromUser);

module.exports = router;
