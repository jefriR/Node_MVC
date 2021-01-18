const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const checkSession = require("./controllers/loginMiddleware");

// Middlerware
dotenv.config();
app.use("/public", express.static("public"));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(flash());
app.use(
  express.urlencoded({
    extended: false
  })
); //Bodyparser
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 1000
    }
  })
); //Session

// Global Variabel
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Import Route
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

// Route
// app.get("/", (req, res) => res.redirect("posts/"));
app.get("/", checkSession, (req, res) => res.redirect("posts/"));
app.use("/users", userRoute);
app.use('/posts', checkSession, postRoute);

// Connect DB
mongoose.connect(
  "mongodb://localhost:27017/Node_10", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("DB Connected !!")
);

// Init Server
app.listen(3000, () => console.log("Server is running!!"));