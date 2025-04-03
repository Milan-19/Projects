const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");
const notificationRoutes = require("./routes/notification.routes");

// Middleware
const { authMiddleware } = require("./middleware/auth.middleware");

// Utils
const { initializeReminderScheduler } = require("./utils/reminderScheduler");

// Config
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection with MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

// Initialize reminder scheduler
initializeReminderScheduler();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", authMiddleware, todoRoutes);
app.use("/api/notifications", authMiddleware, notificationRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Todo API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
