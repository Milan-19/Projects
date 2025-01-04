const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

// ! Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ! Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ! Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// ! Load tasks from json file
function loadTasks() {
  try {
    return JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
  } catch (error) {
    return [];
  }
}

// ! Save tasks to json file
function saveTasks(tasks) {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));
}

// * Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/add", (req, res) => {
  const newTask = req.body.task;
  const tasks = loadTasks();
  tasks.push(newTask);
  saveTasks(tasks);
  res.redirect("/");
});

app.get("/tasks", (req, res) => {
  const tasks = loadTasks();
  res.render("tasks", { tasks });
});

// ! Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
