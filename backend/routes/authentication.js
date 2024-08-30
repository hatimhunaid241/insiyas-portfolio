const express = require("express");
const { loginUser, registerUser } = require("../controllers/authentication");
const {
  loginValidation,
  validatePost,
  registerValidation,
} = require("../middleware/authentication");
const router = express.Router();

// Login Route
router.post(`/login`, loginValidation, validatePost, loginUser);
router.post("/register", registerValidation, validatePost, registerUser);

module.exports = router;
