const express = require("express");
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  sendReminder,
} = require("../controllers/todo.controller");

const router = express.Router();

// Routes for todos (all protected by auth middleware in server.js)
router.route("/").get(getTodos).post(createTodo);

router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

// Send reminder route
router.post("/:id/send-reminder", sendReminder);

module.exports = router;
