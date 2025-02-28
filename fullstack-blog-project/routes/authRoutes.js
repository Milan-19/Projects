const express = require("express");
const {
  getLogin,
  login,
  getRegister,
  register,
  logout,
} = require("../controllers/authController");
const authRoutes = express.Router();

// !render login page
authRoutes.get("/login", getLogin);

// !Main logic for user login
authRoutes.post("/login", login);

// !render register page
authRoutes.get("/register", getRegister);

// !Main logic for user registration
authRoutes.post("/register", register);

// !logout
authRoutes.get("/logout", logout);

module.exports = authRoutes;
