const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null },
  username: { type: String },
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  avatar: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  area_code: { type: String, default: null },
  phone: { type: String, default: null },
  gender: { type: String, enum: ["MALE", "FEMALE", "UNKNOWN"], default: "UNKNOWN" },
  country: { type: String, default: null },
  birthday: { type: Date, default: null },
  verified: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema, "accounts");

module.exports = { User };
