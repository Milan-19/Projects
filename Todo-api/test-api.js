const fetch = require("node-fetch");

// Configuration
const API_URL = "http://localhost:5000";
let authToken = "";
let todoId = "";

// Test user data
const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

// Test todo data
const testTodo = {
  title: "Test Todo",
  description: "This is a test todo item",
  status: "pending",
  deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
  reminder: {
    enabled: true,
    time: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
  },
};

// Helper function to make API requests
async function makeRequest(
  endpoint,
  method = "GET",
  data = null,
  token = null
) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    console.error(`Error making request to ${endpoint}:`, error);
    return { status: 500, data: { success: false, error: error.message } };
  }
}

// Run tests
async function runTests() {
  console.log("Starting API Tests...\n");

  // Test 1: Register user
  console.log("Test 1: Register user");
  const registerResult = await makeRequest(
    "/api/auth/register",
    "POST",
    testUser
  );
  console.log(`Status: ${registerResult.status}`);
  console.log(registerResult.data);
  console.log("-------------------\n");

  if (registerResult.data.success) {
    authToken = registerResult.data.token;
  } else {
    // Try logging in if registration fails (user might already exist)
    console.log("Test 2: Login user");
    const loginResult = await makeRequest("/api/auth/login", "POST", {
      email: testUser.email,
      password: testUser.password,
    });
    console.log(`Status: ${loginResult.status}`);
    console.log(loginResult.data);
    console.log("-------------------\n");

    if (loginResult.data.success) {
      authToken = loginResult.data.token;
    } else {
      console.error("Authentication failed, cannot continue tests.");
      return;
    }
  }

  // Test 3: Get current user
  console.log("Test 3: Get current user");
  const userResult = await makeRequest("/api/auth/me", "GET", null, authToken);
  console.log(`Status: ${userResult.status}`);
  console.log(userResult.data);
  console.log("-------------------\n");

  // Test 4: Create Todo
  console.log("Test 4: Create Todo");
  const createTodoResult = await makeRequest(
    "/api/todos",
    "POST",
    testTodo,
    authToken
  );
  console.log(`Status: ${createTodoResult.status}`);
  console.log(createTodoResult.data);
  console.log("-------------------\n");

  if (createTodoResult.data.success) {
    todoId = createTodoResult.data.data._id;
  } else {
    console.error("Could not create todo, skipping related tests.");
    return;
  }

  // Test 5: Get all Todos
  console.log("Test 5: Get all Todos");
  const getAllTodosResult = await makeRequest(
    "/api/todos",
    "GET",
    null,
    authToken
  );
  console.log(`Status: ${getAllTodosResult.status}`);
  console.log(getAllTodosResult.data);
  console.log("-------------------\n");

  // Test 6: Get single Todo
  console.log("Test 6: Get single Todo");
  const getSingleTodoResult = await makeRequest(
    `/api/todos/${todoId}`,
    "GET",
    null,
    authToken
  );
  console.log(`Status: ${getSingleTodoResult.status}`);
  console.log(getSingleTodoResult.data);
  console.log("-------------------\n");

  // Test 7: Update Todo
  console.log("Test 7: Update Todo");
  const updateTodoResult = await makeRequest(
    `/api/todos/${todoId}`,
    "PUT",
    {
      status: "in-progress",
      description: "Updated description",
    },
    authToken
  );
  console.log(`Status: ${updateTodoResult.status}`);
  console.log(updateTodoResult.data);
  console.log("-------------------\n");

  // Test 8: Send reminder
  console.log("Test 8: Send reminder");
  const sendReminderResult = await makeRequest(
    `/api/todos/${todoId}/send-reminder`,
    "POST",
    null,
    authToken
  );
  console.log(`Status: ${sendReminderResult.status}`);
  console.log(sendReminderResult.data);
  console.log("-------------------\n");

  // Test 9: Delete Todo
  console.log("Test 9: Delete Todo");
  const deleteTodoResult = await makeRequest(
    `/api/todos/${todoId}`,
    "DELETE",
    null,
    authToken
  );
  console.log(`Status: ${deleteTodoResult.status}`);
  console.log(deleteTodoResult.data);
  console.log("-------------------\n");

  console.log("All tests completed!");
}

// Run the tests
runTests().catch((error) => {
  console.error("Error running tests:", error);
});
