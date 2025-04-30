const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("new user", newUser);
    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      message: "No User Found",
    });

  const isUserMatched = await bcrypt.compare(password, user.password);
  if (!isUserMatched)
    return res.status(404).json({
      message: "Invalid Credentials",
    });
  const jwtToken = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });
  return res.status(200).json({
    message: "Token Generated Successfully",
    token: jwtToken,
    userInfo: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
