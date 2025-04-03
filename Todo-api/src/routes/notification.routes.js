const express = require("express");
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

const router = express.Router();

// Routes for notifications (all protected by auth middleware in server.js)
router.get("/", getNotifications);
router.post("/read", markAsRead);

module.exports = router;
