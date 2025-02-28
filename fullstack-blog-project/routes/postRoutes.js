const express = require("express");
const {
  getPostForm,
  createPost,
  getAllPosts,
  getPostById,
  getEditPostForm,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");
const postRoutes = express.Router();
const upload = require("../config/multer");
const { ensureAuthenticated } = require("../middlewares/auth");

// !render post form
postRoutes.get("/add", getPostForm);

// !create post logic
postRoutes.post(
  "/add",
  ensureAuthenticated,
  upload.array("images", 5),
  createPost
);

// !get all posts
postRoutes.get("/", getAllPosts);

// !get post by id
postRoutes.get("/:id", getPostById);
postRoutes.get("/:id/edit", getEditPostForm);
postRoutes.put(
  "/:id",
  ensureAuthenticated,
  upload.array("images", 5),
  updatePost
);

// !delete post
postRoutes.delete("/:id", ensureAuthenticated, deletePost);

module.exports = postRoutes;
