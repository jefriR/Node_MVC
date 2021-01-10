const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const mdl = require("./controllers/loginMiddleware");

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
    secret: "secret",
    resave: false,
    saveUninitialized: true
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

// Route
app.get("/", mdl, (req, res) => res.render("home"));
app.use("/users", userRoute);

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