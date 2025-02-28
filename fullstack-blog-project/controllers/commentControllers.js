const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// !add comment
exports.addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  // !find the post
  const post = await Post.findById(postId);
  // !validation
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      user: req.user, // !pass the user object to the view
      post,
      error: "Post not found",
      success: "",
    });
  }
  if (!content) {
    return res.render("postDetails", {
      title: "Post",
      user: req.user, // !pass the user object to the view
      post,
      error: "Please enter a comment",
      success: "",
    });
  }
  // !create comment
  const comment = new Comment({
    content,
    post: post._id,
    author: req.user._id,
  });
  await comment.save();
  // !push comment to post
  post.comments.push(comment._id);
  await post.save();
  res.redirect(`/posts/${post._id}`);
});

// !edit comment
exports.getCommentForm = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      user: req.user, // !pass the user object to the view
      comment,
      error: "Comment not found",
      success: "",
    });
  }
  res.render("editComment", {
    title: "Edit Comment",
    user: req.user, // !pass the user object to the view
    comment,
    error: "",
    success: "",
  });
});

// !update comment
exports.updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      user: req.user, // !pass the user object to the view
      comment,
      error: "Comment not found",
      success: "",
    });
  }
  if (comment.author.toString() !== req.user._id.toString()) {
    return res.render("postDetails", {
      title: "Post",
      user: req.user, // !pass the user object to the view
      comment,
      error: "You are not authorized to update this comment",
      success: "",
    });
  }
  comment.content = content || comment.content;
  await comment.save();
  res.redirect(`/posts/${comment.post}`);
});

// !delete comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      user: req.user, // !pass the user object to the view
      comment,
      error: "Comment not found",
      success: "",
    });
  }
  if (comment.author.toString() !== req.user._id.toString()) {
    return res.render("postDetails", {
      title: "Post",
      user: req.user, // !pass the user object to the view
      comment,
      error: "You are not authorized to delete this comment",
      success: "",
    });
  }
  await Comment.findByIdAndDelete(req.params.id);
  res.redirect(`/posts/${comment.post}`);
});
