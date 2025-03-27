require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const socketIo = require("./socket");
const userRouter = require("./routes/userRoutes");
const groupRouter = require("./routes/groupRoutes");
const messageRouter = require("./routes/messageRouts");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// middlewares
app.use(cors());
app.use(express.json());

// connect to db
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("MongoDB connection failed", err));

// Initialize
socketIo(io);

// our routes
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);
app.use("/api/messages", messageRouter);

// start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
  if (err) {
    console.error("something went wrong", err);
  }
  console.log(`Server is up and running on port:${PORT}`);
});
