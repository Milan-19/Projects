const Todo = require("../models/todo.model");
const User = require("../models/user.model");
const { createReminderNotification } = require("./notifications");

/**
 * Function to check for upcoming reminders and create notifications
 * In a production environment, this would be handled by a job scheduler like node-cron or agenda
 */
const checkReminders = async () => {
  try {
    // Find all todos with enabled reminders that haven't been sent yet
    const currentTime = new Date();
    const upcomingTodos = await Todo.find({
      "reminder.enabled": true,
      "reminder.sent": false,
      "reminder.time": { $lte: currentTime },
    });

    console.log(`Found ${upcomingTodos.length} reminders to process`);

    // Create notification for each todo
    for (const todo of upcomingTodos) {
      try {
        // Get user details
        const user = await User.findById(todo.user);
        if (!user) {
          console.error(`User not found for todo ${todo._id}`);
          continue;
        }

        // Create reminder notification
        await createReminderNotification(user, todo);

        // Update reminder sent status
        todo.reminder.sent = true;
        await todo.save();

        console.log(
          `Notification created for todo ${todo._id} for user ${user.email}`
        );
      } catch (error) {
        console.error(
          `Error creating notification for todo ${todo._id}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error("Error checking reminders:", error);
  }
};

/**
 * Initialize the reminder scheduler
 * This would typically be called when the server starts
 */
const initializeReminderScheduler = () => {
  // Check for reminders every minute
  // In a production app, use a proper job scheduler
  setInterval(checkReminders, 60 * 1000);
  console.log("Reminder scheduler initialized");
};

module.exports = {
  checkReminders,
  initializeReminderScheduler,
};
