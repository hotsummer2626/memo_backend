const express = require("express");
const { addUser, getUserById } = require("../controllers/user");
const authGuard = require("../middlewares/authGuard");

const router = express.Router();

router.post("/", addUser);
router.get("/:id", authGuard, getUserById);

module.exports = router;
