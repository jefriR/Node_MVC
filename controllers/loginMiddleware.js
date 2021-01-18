const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.session.auth;
  const sess = req.session;

  if (!token) {
    const errors = [{
      msg: "Login First"
    }];
    res.render("login", {
      errors
    });
  } else {
    next();
  }

  // try {
  // const verified = jwt.verify(token, "asdqweasdqwrsawrsdfwer");
  // req.user = verified;
  // next();
  // } catch (error) {
  //     res.status(400).send("Invalid token !!");
  // }
};