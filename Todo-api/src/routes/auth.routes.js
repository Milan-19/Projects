const express = require("express");
const { register, login, getMe } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

// Register and login routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/me", authMiddleware, getMe);

module.exports = router;
