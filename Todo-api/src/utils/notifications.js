// Store pending notifications in memory (in a real app, these would be in the database)
const pendingNotifications = {};

/**
 * Create a notification that can be retrieved by the frontend to show as a popup
 */
const createNotification = async (userId, notification) => {
  if (!pendingNotifications[userId]) {
    pendingNotifications[userId] = [];
  }

  // Add timestamp to notification
  const notificationWithTimestamp = {
    ...notification,
    id: Date.now().toString(),
    createdAt: new Date(),
  };

  pendingNotifications[userId].push(notificationWithTimestamp);

  // For demo purposes, log the notification
  console.log(
    `Notification created for user ${userId}:`,
    notificationWithTimestamp
  );

  return notificationWithTimestamp;
};

/**
 * Create a reminder notification for a todo
 */
const createReminderNotification = async (user, todo) => {
  return await createNotification(user._id, {
    type: "todo-reminder",
    title: `Reminder: ${todo.title}`,
    message: `Don't forget to complete your todo: "${todo.title}"`,
    todoId: todo._id,
    deadline: todo.deadline,
  });
};

/**
 * Get all pending notifications for a user
 */
const getNotificationsForUser = (userId) => {
  return pendingNotifications[userId] || [];
};

/**
 * Mark notifications as read
 */
const markNotificationsAsRead = (userId, notificationIds) => {
  if (!pendingNotifications[userId]) {
    return;
  }

  // Remove the specified notifications
  pendingNotifications[userId] = pendingNotifications[userId].filter(
    (notification) => !notificationIds.includes(notification.id)
  );
};

module.exports = {
  createNotification,
  createReminderNotification,
  getNotificationsForUser,
  markNotificationsAsRead,
};
