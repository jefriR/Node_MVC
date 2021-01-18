const userModel = require("../models/Users");
const validation = require("./validation");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  // Login Function
  viewLogin: (req, res) => {
    res.render("login");
  },
  postLogin: async (req, res) => {
    const errors = [];
    const {
      email,
      password
    } = req.body;

    const {
      error
    } = validation.loginValidation(req.body);

    if (error) {
      errors.push({
        msg: error.details[0]["message"]
      });
    }

    if (errors.length > 0) {
      res.render("login", {
        errors,
        email
      });
    } else {
      const user = await userModel.findOne({
        email: email
      });

      if (!user) {
        errors.push({
          msg: "Email doesn't exists !!"
        });
      }

      const validPassword = await brcypt.compare(password, user.password);

      if (!validPassword) {
        errors.push({
          msg: "Invalid password !!"
        });
      }

      if (errors.length > 0) {
        res.render("login", {
          errors,
          email
        });
      } else {
        // Create new token
        const token = await jwt.sign({
            _id: user._id
          },
          process.env.TOKEN_SECRET
        );

        let sess = req.session;
        sess.auth = token;
        sess.userName = user.name;

        res.set("auth-token", token).redirect("/");
      }
    }
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/");
    });
  },

  // Register Function
  viewRegister: (req, res) => {
    res.render("register");
  },
  postRegister: async (req, res) => {
    const errors = [];
    const {
      name,
      email,
      password,
      password2
    } = req.body;

    const {
      error
    } = validation.registerValidation(req.body);

    const emailExist = await userModel.findOne({
      email: req.body.email
    });

    if (error) {
      errors.push({
        msg: error.details[0]["message"]
      });
    }

    if (password !== password2) {
      errors.push({
        msg: "Password do not match !!"
      });
    }

    if (emailExist) {
      errors.push({
        msg: "Email alrady exists !!"
      });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      // Hash password
      const salt = await brcypt.genSalt(10);
      const hashPassword = await brcypt.hash(password, salt);

      // Create new user
      const newUser = new userModel({
        name,
        email,
        password: hashPassword
      });

      try {
        const savedUser = await newUser.save();
        req.flash("success_msg", "You are now registered!");
        res.redirect("/users/login");
      } catch (err) {
        res.send(err);
      }
    }
  }
};