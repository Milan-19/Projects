const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");
const Post = require("../models/Post");
const File = require("../models/File");
const Comment = require("../models/Comment");
// !get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  // !find the user
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.render("login", {
      title: "Login",
      user: req.user,
      error: "User not found",
      success: "",
    });
  }

  // !fetch user's posts
  const posts = await Post.find({ author: req.user._id }).sort({
    createdAt: -1,
  });

  res.render("profile", {
    title: "Profile",
    user, // !pass the user object to the view
    posts,
    error: "",
    postCount: posts.length,
  });
});

// !get edit profile form
exports.getEditProfileForm = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.render("login", {
      title: "Login",
      user: req.user,
      error: "User not found",
    });
  }
  res.render("editProfile", {
    title: "Edit Profile",
    user, // !pass the user object to the view
    error: "",
  });
});

// !update profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { username, email, bio } = req.body;
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.render("login", {
      title: "Login",
      user: req.user,
      error: "User not found",
      success: "",
    });
  }
  user.username = username || user.username;
  user.email = email || user.email;
  user.bio = bio || user.bio;
  if (req.file) {
    if (user.profilePicture && user.profilePicture.public_id) {
      await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }
  }
  const file = await File({
    url: req.file.path,
    public_id: req.file.filename,
    uploaded_by: req.user._id,
  });
  await file.save();
  user.profilePicture = {
    url: file.url,
    public_id: file.public_id,
  };
  await user.save();
  res.render("editProfile", {
    title: "Edit Profile",
    user, // !pass the user object to the view
    error: "",
    success: "Profile updated successfully",
  });
});

// !delete profile
exports.deleteProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.render("login", {
      title: "Login",
      user: req.user,
      error: "User not found",
    });
  }
  if (user.profilePicture && user.profilePicture.public_id) {
    await cloudinary.uploader.destroy(user.profilePicture.public_id);
  }
  const posts = await Post.find({ author: req.user._id });
  for (const post of posts) {
    for (const image of post.images) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }
    await Comment.deleteMany({ post: post._id });
    await Post.findByIdAndDelete(post._id);
  }
  // !delete user's comments
  await Comment.deleteMany({ author: req.user._id });
  // !delete user's files
  const files = await File.find({ uploaded_by: req.user._id });
  for (const file of files) {
    if (file.public_id) {
      await cloudinary.uploader.destroy(file.public_id);
    }
  }
  // !delete user's files
  await File.deleteMany({ uploaded_by: req.user._id });
  // !delete user
  await User.findByIdAndDelete(req.user._id);
  res.redirect("/auth/register");
});
