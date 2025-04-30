const Post = require("../models/postModel");
const User = require("../models/userModel");
const { findById } = require("../models/userModel");

exports.createPost = async (req, res) => {
  const { title, tags, content } = req.body;
  const user = req.user;

  try {
    const newPost = new Post({
      title,
      tags: tags,
      content,
      author: user._id,
    });

    await newPost.save();
    res.status(201).json({ message: "Created Successfully", newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.allPosts = async (req, res) => {
  try {
    const { tags } = req.query; 

    let filterBy = {};
    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      filterBy.tags = { $in: tagArray };
    }

    const allPosts = await Post.find(filterBy).sort({ createdAt: -1 });

    if (allPosts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.readPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error reading post:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, tags, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, tags: tags, content }, { new: true, runValidators: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: error.message });
  }
};
