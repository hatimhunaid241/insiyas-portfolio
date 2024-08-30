const { body, validationResult } = require("express-validator");

// Validation rules
const loginValidation = [
  body("type").isIn(["EMAIL", "PHONE"]).withMessage("Type must be email, or phone"),
  body("login_id")
    .custom((value, { req }) => {
      // Validate based on 'type'
      if (req.body.type === "EMAIL") {
        // Validate email format
        if (!/\S+@\S+\.\S+/.test(value)) {
          throw new Error("Login ID must be a valid email address");
        }
      } else if (req.body.type === "PHONE") {
        // Validate phone number format (simple check for numbers only)
        if (!/^\d+$/.test(value)) {
          throw new Error("Login ID must be a valid phone number");
        }
      }
      // No additional validation for username
      return true;
    })
    .notEmpty()
    .withMessage("Login ID is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .notEmpty()
    .withMessage("Password is required"),
];

// Validation result middleware
const validatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body("type").isIn(["EMAIL", "PHONE"]).withMessage("Type must be email or phone"),
  body("first_name").notEmpty().withMessage("First name is required"),

  body("login_id")
    .custom((value, { req }) => {
      if (req.body.type === "EMAIL") {
        if (!/\S+@\S+\.\S+/.test(value)) {
          throw new Error("Login ID must be a valid email address");
        }
      } else if (req.body.type === "PHONE") {
        if (!/^\d+$/.test(value)) {
          throw new Error("Login ID must be a valid phone number");
        }
      }
      return true;
    })
    .notEmpty()
    .withMessage("Login ID is required"),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = { loginValidation, validatePost, registerValidation };
