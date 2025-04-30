const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const { createPost, allPosts, readPost, updatePost, deletePost } = require("../controllers/postController");

router.post("/createPost", authMiddleware, createPost);
router.get("/posts", authMiddleware, allPosts);
router.get("/posts/:id", authMiddleware, readPost);
router.put("/posts/:id", authMiddleware, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);

module.exports = router;
