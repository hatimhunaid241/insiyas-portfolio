const { User } = require("../models/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login User
const loginUser = async (req, res) => {
  const { type = "EMAIL", login_id, password } = req.body;

  try {
    // Check for missing fields
    if (!login_id || !password) {
      return res.status(400).json({ msg: "Please provide all required fields." });
    }

    // Find user by email or username depending on the type
    const user = await User.findOne({ [type.toLowerCase()]: login_id });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // Create and send JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });

    res.json({
      msg: "User logged in successfuly",
      token,
      user_id: user._id,
    });
    console.log(req.headers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error." });
  }
};

const registerUser = async (req, res) => {
  const { type = "EMAIL", first_name, last_name = "", login_id, password } = req.body;

  // Determine unique field based on type
  let uniqueField = type === "EMAIL" ? "email" : "phone";

  try {
    // Check if user already exists
    let user = await User.findOne({ [uniqueField]: login_id });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    const userData = {
      first_name,
      last_name,
      [uniqueField]: login_id,
      password,
    };

    user = new User(userData);
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });

    res.json({
      msg: "User registered successfuly",
      token,
      user_id: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { loginUser, registerUser };
