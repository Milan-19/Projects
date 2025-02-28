require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const passportConfig = require("./config/passport");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middlewares/errorHandler");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

// !port
const PORT = process.env.PORT || 3000;

// !middleware: passing form data
app.use(express.urlencoded({ extended: true }));

// !session middleware
app.use(
  session({
    secret: "solo leveling",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

// !method override middleware
app.use(methodOverride("_method"));

// !passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// !ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { user: req.user, error: "", title: "Home" });
});

// !routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/", commentRoutes);
app.use("/user", userRoutes);

// !error handler
app.use(errorHandler);

// !start server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("DB connected");
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Database connection failed");
  });
