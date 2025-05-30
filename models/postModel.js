const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
