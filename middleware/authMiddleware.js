const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "No token, access denied",
    });
  try {
    const verifiedUser = jwt.verify(token, jwtSecretKey);
    console.log("verified user", verifiedUser);
    let user = await User.findById(verifiedUser.id).select("-password");
    // user details
    console.log("user details", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ Error: `Invalid Token ${error}` });
  }
};

module.exports = authMiddleware;
