const express = require("express");
const userRoutes = express.Router();
const upload = require("../config/multer");
const {
  getUserProfile,
  getEditProfileForm,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController");
const { ensureAuthenticated } = require("../middlewares/auth");

// !render login page
userRoutes.get("/profile", ensureAuthenticated, getUserProfile);

// !render edit profile page
userRoutes.get("/edit", ensureAuthenticated, getEditProfileForm);
userRoutes.post("/delete", ensureAuthenticated, deleteProfile);
userRoutes.post(
  "/edit",
  ensureAuthenticated,
  upload.single("profilePicture"),
  updateProfile
);

module.exports = userRoutes;
