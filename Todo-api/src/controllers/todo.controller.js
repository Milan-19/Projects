const Todo = require("../models/todo.model");
const User = require("../models/user.model");
const { createReminderNotification } = require("../utils/notifications");

// @desc    Get all todos for logged in user
// @route   GET /api/todos
// @access  Private
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: error.message,
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id ${req.params.id}`,
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: `User ${req.user.id} is not authorized to access this todo`,
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todo",
      error: error.message,
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const todo = await Todo.create(req.body);

    // Schedule reminder if enabled
    if (todo.reminder && todo.reminder.enabled && todo.reminder.time) {
      // This would typically be handled by a job scheduler like node-cron or agenda
      // For demo purposes, we'll just log it
      console.log(
        `Reminder scheduled for todo ${todo._id} at ${todo.reminder.time}`
      );
    }

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating todo",
      error: error.message,
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
exports.updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id ${req.params.id}`,
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this todo`,
      });
    }

    // Update todo
    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Update reminder if changed
    if (todo.reminder && todo.reminder.enabled && todo.reminder.time) {
      // This would typically be handled by a job scheduler
      console.log(
        `Reminder updated for todo ${todo._id} at ${todo.reminder.time}`
      );
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: error.message,
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id ${req.params.id}`,
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this todo`,
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: error.message,
    });
  }
};

// @desc    Send reminder for todo
// @route   POST /api/todos/:id/send-reminder
// @access  Private
exports.sendReminder = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id ${req.params.id}`,
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: `User ${req.user.id} is not authorized for this todo`,
      });
    }

    // Get user details
    const user = await User.findById(req.user.id);

    // Create notification instead of sending email
    await createReminderNotification(user, todo);

    // Update reminder sent status
    todo.reminder.sent = true;
    await todo.save();

    res.status(200).json({
      success: true,
      message: "Reminder notification created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating reminder notification",
      error: error.message,
    });
  }
};
